import React from "react";
import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContextType } from "../models/authContextType";
import { User } from "../models/UserType";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login() {},
  logout() {},
});

type Props = {
  children?: React.ReactNode;
};
const AuthContextProvider: React.FC<Props> = ({ children }) => {
  let navigate = useHistory();
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
    navigate.replace("/");
  };
  const logout = () => {
    setUser(null);
    navigate.replace("/login");
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
