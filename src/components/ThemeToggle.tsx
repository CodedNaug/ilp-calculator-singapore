import React from "react";
import { useTheme } from "../theme/ThemeProvider";

export default function ThemeToggle() {
    const { mode, setMode, toggle } = useTheme();

    return (
        <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-1">
            <button
                className={`px-2 py-1 rounded ${mode === "auto" ? "border border-[var(--border)]" : ""}`}
                onClick={() => setMode("auto")}
                title="Follow device setting"
            >
                Auto
            </button>
            <button
                className={`px-2 py-1 rounded ${mode === "light" ? "border border-[var(--border)]" : ""}`}
                onClick={() => setMode("light")}
                title="Light mode"
            >
                ☀️
            </button>
            <button
                className={`px-2 py-1 rounded ${mode === "dark" ? "border border-[var(--border)]" : ""}`}
                onClick={() => setMode("dark")}
                title="Dark mode"
            >
                🌙
            </button>

            {/* Optional: quick flip */}
            <button className="ml-1 px-2 py-1 rounded hover:opacity-90" onClick={toggle} title="Toggle Light/Dark">
                ↔︎
            </button>
        </div>
    );
}
