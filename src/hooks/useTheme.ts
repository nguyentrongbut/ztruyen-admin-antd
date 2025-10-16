// ** React
import {useContext} from "react";

// ** Context
import {ThemeContext} from "@/context/theme.context.tsx";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};