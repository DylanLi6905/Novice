import { db } from "./db.js";

export function buildGoogleAuthUrl() {
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  googleAuthUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
  googleAuthUrl.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid profile email");

  return googleAuthUrl.toString();
}

export async function getCurrentUserFromSession(sessionId: string) {
  const [session] = await db`
    SELECT * FROM sessions
    WHERE session_id = ${sessionId}
      AND expires_at > NOW()
    LIMIT 1
  `;

  if (!session) {
    return null;
  }

  const [user] = await db`
    SELECT * FROM users
    WHERE user_id = ${session.user_id}
    LIMIT 1
  `;

  if (!user) {
    return null;
  }

  return {
    user_id: user.user_id,
    email: user.email,
    provider_id: user.provider_id,
  };
}

export async function deleteSession(sessionId: string) {
  await db`
    DELETE FROM sessions
    WHERE session_id = ${sessionId}
  `;
}
