import { useContext } from "react";
import { CurrentUserContext } from "./auth-context";

export function useAuth() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useAuth must be used within Authentication");
  }

  return context;
}
