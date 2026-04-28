import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { trpcClient } from "../../../trpcClient";

type User = {
  id: string
  email: string
}
type AuthContextValue = {
  user: User | null
  setUser: (user: User | null) => void
}

const CurrentUserContext = createContext<AuthContextValue| undefined>(undefined);

export function Authentication({children}: {children: ReactNode}){
  const [user, setUser] = useState<User | null>(null); 
  
  const fetchUser = async() => {
      const res = await trpcClient.user.authMe.query();

      if (!res) {
        setUser(null)
      } else {
        setUser({
          id: res.user_id,
          email: res.email
        })
      }
      
  }
  useEffect(() => {
        void fetchUser();
      }, []);
  
  return (
    <CurrentUserContext.Provider value = {{user,setUser}}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(CurrentUserContext)
  if (!context) {
    throw new Error ("useAuth must be used within Authentication")
  }
  return context;
}
