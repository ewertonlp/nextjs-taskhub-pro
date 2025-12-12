"use client";
import { toggleTheme } from "@/app/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Settings() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <div className="max-w-7xl mx-auto my-18 md:my-8 lg:p-6 ">
      <div>
        <h1 className="text-2xl mb-4 text-slate-800 dark:text-slate-200">
          Profile
        </h1>
      </div>
      <div className="border-t border-slate-800 dark:border-slate-500 py-4">
        <h1 className="text-2xl mb-4 text-slate-800 dark:text-slate-200">
          Settings
        </h1>
        <div className="flex items-center gap-4">
          <h3 className="font-medium text-slate-800 dark:text-slate-300">
            Dark / Light
          </h3>
          <div className="border border-slate-300 bg-slate-50 dark:bg-slate-700 dark:border-slate-500 rounded-lg">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="px-3 py-2 flex items-center rounded-full transition-transform duration-300 hover:scale-110"
            >
              <span
                className="inline-block transition-all duration-300 animate-spin-slow cursor-pointer"
                key={theme}
              >
                {theme === "dark" ? (
                  <FiSun className="text-yellow-400" size={20} />
                ) : (
                  <FiMoon className="text-slate-800" size={20} />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
