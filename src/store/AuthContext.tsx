import React from "react";
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContextType } from "../models/authContextType";
import { User } from "../models/UserType";

export const AuthContext = createContext<AuthContextType>(null!);

type Props = {
  children?: React.ReactNode;
};
const AuthContextProvider: React.FC<Props> = ({ children }) => {
  let navigate = useHistory();
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    navigate.replace("/");
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;

export function useAuth() {
  return React.useContext(AuthContext);
}
