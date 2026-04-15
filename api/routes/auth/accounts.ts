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
    //"code" means: after the user logs in, send mt backend an authorization code
    googleAuthUrl.searchParams.set("response_type","code");

    //tells google you're using openid for identity support
    googleAuthUrl.searchParams.set("scope", "openid");

    res.redirect(googleAuthUrl.toString());
});