import React, { createContext, useContext, useEffect, useState } from "react";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const THEME_SYSTEM = "system";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(THEME_SYSTEM);

    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? THEME_DARK
            : THEME_LIGHT;

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
            setTheme(savedTheme);
        } else {
            setTheme(THEME_SYSTEM);
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        const effectiveTheme =
            theme === THEME_SYSTEM ? getSystemTheme() : theme;

        if (effectiveTheme === THEME_DARK) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        if (theme === THEME_SYSTEM) {
            localStorage.removeItem("theme");
        } else {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) =>
            prev === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
