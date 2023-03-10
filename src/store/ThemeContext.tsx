import React from "react";
import { createContext, useEffect, useState } from "react";
import { ThemeContextType } from "../models/ContextThemeType";

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  setThemeDark(dark) {},
});

type Props = {
  children?: React.ReactNode;
};
const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(prefersDark.matches);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);
  const setThemeDark = (isDark: boolean) => {
    setDark(isDark);
  };
  return (
    <ThemeContext.Provider value={{ dark, setThemeDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;

export function useTheme() {
  return React.useContext(ThemeContext);
}
