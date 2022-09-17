import { useEffect, useState } from "react";

export default function useThemeModes() {
    const [theme, setTheme] = useState(localStorage.theme || 'light');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light');
        root.classList.remove('dark');
        root.classList.add(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme);
    }, [theme])

    return { theme, setTheme };
}