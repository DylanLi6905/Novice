import { useEffect, useState, type ReactNode } from "react";
import { trpcClient } from "../../../trpcClient";
import { CurrentUserContext, type User } from "./auth-context";

export function Authentication({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;

    void trpcClient.session.authMe.query().then((res) => {
      if (cancelled) {
        return;
      }

      if (!res) {
        setUser(null);
        return;
      }

      setUser({
        id: res.user_id,
        email: res.email,
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
