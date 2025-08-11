import React, { createContext, useContext, useEffect, useState } from "react";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? THEME_DARK
            : THEME_LIGHT;

    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
            return savedTheme;
        }

        return getSystemTheme();
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove(THEME_LIGHT, THEME_DARK);
        root.classList.add(theme);

        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            const savedTheme = localStorage.getItem("theme");
            if (!savedTheme) {
                setTheme(getSystemTheme());
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
