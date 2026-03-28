import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

  /*
  const fetchUser = async() => {
      
      const res = await getCurrentUser();

      if (!res.data) {
        setUser(null)
      } else {
        setUser({
          id: res.data.user_id,
          email: res.data.email
        })
      }
      
  }
  useEffect(() => {
        void fetchUser();
      }, []);
  */ 
  return (
    <CurrentUserContext.Provider value = {{user,setUser}}>
      {children}
    </CurrentUserContext.Provider>
  )
}

