import { createContext, useState, type ReactNode } from 'react';

type User = {name:string} | null; // null being not logged in

type AuthContextValue = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
};

const CurrentUserContext = createContext<AuthContextValue| undefined>(undefined);

export default function Authentication({children}: {children: ReactNode}){
  const [currentUser, setCurrentUser] = useState<User>(null); // needs <User> because (null) is too vague
  return (
    <CurrentUserContext value = {{currentUser,setCurrentUser}}>
      {children}
    </CurrentUserContext>
  )
}

