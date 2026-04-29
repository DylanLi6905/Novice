import { Router } from "express";
import { db } from "../../db.js";
import crypto from "crypto";

export const authRouter = Router();

authRouter.get("/callback/google", async (req, res) => {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    res.status(400).json({ error: "Missing code parameter" });
    return;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    res.status(400).json({ error: "Failed to get access token" });
    return;
  }

  const tokens = await tokenResponse.json();
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      Accept: "application/json",
    },
  });

  const googleUser = await userResponse.json();

  const [existingUser] = await db`
    SELECT * FROM users
    WHERE provider_id = ${googleUser.sub}
    LIMIT 1
  `;

  let userId: string;

  if (existingUser) {
    userId = existingUser.user_id;
  } else {
    const [newUser] = await db`
      INSERT INTO users (email, provider_id)
      VALUES (${googleUser.email}, ${googleUser.sub})
      RETURNING user_id
    `;
    userId = newUser.user_id;
  }

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await db`
    INSERT INTO sessions (session_id, user_id, expires_at)
    VALUES (${sessionId}, ${userId}, ${expiresAt})
  `;

  res.cookie("session_id", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  res.redirect("http://localhost:5173");
});
