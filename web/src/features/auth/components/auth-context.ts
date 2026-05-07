import { createContext } from "react";

export type User = {
  id: string;
  email: string;
};

export type AuthContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const CurrentUserContext = createContext<AuthContextValue | undefined>(
  undefined,
);
