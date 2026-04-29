import { db } from "../../db.js";

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
