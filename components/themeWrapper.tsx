"use client"
import { setTheme } from "@/app/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";

export default function ThemeWrapper({ children }: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch(setTheme("dark"));
    }
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme, mounted])

  if (!mounted) {
    return <>{children}</>
  }
  
  return <>{children}</>;
}
