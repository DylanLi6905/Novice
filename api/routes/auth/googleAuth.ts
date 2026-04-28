import { Router } from "express";
import { db } from "../../db.js";
import crypto from "crypto";

export const authRouter = Router();


//express for google callback
authRouter.get("/callback/google", async (req,res) => {
    // { code : abc123 } -> abc123
    const { code } = req.query;

    if (!code || typeof code !== "string") {
        res.status(400).json({error: "Missing code parameter"});
        return
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
            grant_type: "authorization_code",
        })
    });

    if (!tokenResponse.ok) {
        res.status(400).json({error:"Failed to get access token"});
        return
    }

    // decode tokens
    const tokens = await tokenResponse.json();
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            Accept: "application/json"
        }
    });

    const googleUser = await userResponse.json();

    
    // query users by provider_id = googleUser.sub   ${} --> template interpolation syntax
    const [existingUser] = await db`
        SELECT * FROM users
        WHERE provider_id = ${googleUser.sub} 
        LIMIT 1
    `;

    let userId: string;

    if (existingUser) {
       userId = existingUser.user_id;
    } else {
        const [newUser] = await db `
            INSERT INTO users (email, provider_id)
            VALUES (${googleUser.email},${googleUser.sub})
            RETURNING user_id 
        `;
        userId = newUser.user_id;
    }

    // session cookie
    const sessionId = crypto.randomUUID();
    // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 ms
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await db `
        INSERT INTO sessions (session_id, user_id, expires_at)
        VALUES (${sessionId},${userId},${expiresAt})
    `;
    
    //cookie name | cookie value | cookie settings
    res.cookie("session_id", sessionId, {
       httpOnly: true,
       sameSite: "lax",
       expires: expiresAt,
       path:"/", 
    });

    res.redirect("http://localhost:5173");
});
