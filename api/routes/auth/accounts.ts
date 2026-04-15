import { Router } from "express";

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
    
    res.json ({
        email: googleUser.email,
        id: googleUser.sub,
        displayName: googleUser.name,
    });
    return
});