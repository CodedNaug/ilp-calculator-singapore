import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type Mode = "auto" | "light" | "dark";
type Ctx = {
    theme: Theme;         // effective theme applied
    mode: Mode;           // user choice
    setMode: (m: Mode) => void;
    toggle: () => void;   // quick flip between light/dark (sets mode to explicit)
};

const ThemeContext = createContext<Ctx | null>(null);
export const useTheme = () => {
    const v = useContext(ThemeContext);
    if (!v) throw new Error("useTheme must be used within <ThemeProvider>");
    return v;
};

function getSystemTheme(): Theme {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function getInitialMode(): Mode {
    const saved = localStorage.getItem("ilp_theme_mode");
    return saved === "light" || saved === "dark" || saved === "auto" ? (saved as Mode) : "auto";
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [mode, setModeState] = useState<Mode>(getInitialMode);
    const [theme, setTheme] = useState<Theme>(() => (getInitialMode() === "auto" ? getSystemTheme() : (getInitialMode() as Theme)));

    // Keep in sync with system when in "auto"
    useEffect(() => {
        const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (!mq) return;
        const handler = () => {
            if (mode === "auto") setTheme(mq.matches ? "dark" : "light");
        };
        mq.addEventListener?.("change", handler);
        return () => mq.removeEventListener?.("change", handler);
    }, [mode]);

    // Apply theme + persist choice
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("ilp_theme_mode", mode);
    }, [theme, mode]);

    const setMode = (m: Mode) => {
        setModeState(m);
        setTheme(m === "auto" ? getSystemTheme() : (m as Theme));
    };

    const value = useMemo(
        () => ({
            theme,
            mode,
            setMode,
            toggle: () => setMode(theme === "dark" ? "light" : "dark"),
        }),
        [theme, mode]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
