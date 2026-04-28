//// Temporary helper. Replace with generated client code once openapi.yaml is added.

// Temporary function.
// Will be replaced with generated client code once I add openapi to our codebase

export async function getCurrentUser() {
  const res = await fetch("http://localhost:5555/api/auth/me", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
