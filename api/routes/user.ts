import { buildGoogleAuthUrl, deleteSession, getCurrentUserFromSession } from "../auth.js";
import { t } from "../trpc.js";

export const userRouter = t.router({
  oauthRedirectUrl: t.procedure.query(() => {
    return { oauthRedirectUrl: buildGoogleAuthUrl() };
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
