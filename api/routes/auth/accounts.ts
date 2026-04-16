import { Router } from "express";
import { db } from "../../db.js";
import crypto from "crypto";

export const authRouter = Router();

// async = work later. makes the function return a promise
authRouter.get("/login",(_req,res) => {
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    // searchParams = query string part of the url
    // .set(key,value) = add or replace one parameter
    googleAuthUrl.searchParams.set("client_id",process.env.GOOGLE_CLIENT_ID!);
    googleAuthUrl.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);

    //tells google what kind of oauth response you want back
    //"code" means: after the user logs in, send my backend an authorization code
    googleAuthUrl.searchParams.set("response_type","code");

    //tells google you're using openid for identity support
    googleAuthUrl.searchParams.set("scope", "openid profile email");

    res.redirect(googleAuthUrl.toString());
});

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

authRouter.get("/me", async (req,res)=> {
    const sessionId = req.cookies.session_id;

    if (!sessionId) {
        res.status(401).json({error: "Not signed in"});
        return;
    }

    const [session] = await db `
        SELECT * FROM sessions
        WHERE session_id = ${sessionId}
          AND expires_at > NOW()
        LIMIT 1
    `;

    if (!session) {
        res.status(401).json({ error: "Session expired or invalid" });
        return;
    }

    const [user] = await db `
        SELECT * FROM users
        WHERE userId = ${session.user_id}
        LIMIT 1
    `;

    if (!user){
        res.status(404).json({error:"User not found"});
        return  
    }

    res.json({
        user_id: user.user_id,
        email: user.email,
        provider_id: user.provider_id,
    });
});