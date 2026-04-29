import {
  deleteSession,
  getCurrentUserFromSession,
} from "./util.js";
import { t } from "../../trpc.js";

export const sessionRouter = t.router({
  oauthRedirectUrl: t.procedure.query(() => {
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    googleAuthUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
    googleAuthUrl.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "openid profile email");

    return { oauthRedirectUrl: googleAuthUrl.toString() };
  }),
  authMe: t.procedure.query(async ({ ctx }) => {
    const sessionId = ctx.req.cookies.session_id;

    if (!sessionId) {
      return null;
    }

    return getCurrentUserFromSession(sessionId);
  }),
  logout: t.procedure.mutation(async ({ ctx }) => {
    const sessionId = ctx.req.cookies.session_id;

    if (sessionId) {
      await deleteSession(sessionId);
    }

    ctx.res.clearCookie("session_id", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  }),
});
