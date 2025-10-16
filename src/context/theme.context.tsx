// ** React
import {createContext, type ReactNode, useEffect, useState} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | null>(null);

type TProps = { children: ReactNode };

export const ThemeProvider = ({children}: TProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem("ZTC_THEME") as Theme) || "light";
    });

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("ZTC_THEME", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
