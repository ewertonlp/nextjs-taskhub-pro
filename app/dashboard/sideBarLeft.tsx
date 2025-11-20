"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { useAppDispatch } from "../store/hooks";
import { AppDispatch } from "../store/store";
import { logout } from "../features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarClock,
  FolderKanban,
  Home,
  List,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutModal from "@/components/ui/logoutButton";

function SidebarLeft({ user, profile }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch() as unknown as AppDispatch;
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap?.();
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    // Para rotas aninhadas, como /dashboard/tasks, verifica se começa com o href
    return pathname === href;
  };

  // Função auxiliar para determinar classes do ícone (fundo e cor do texto)
  const getIconClasses = (href) => {
    const activeClasses =
      "bg-linear-to-br from-black/70 to-black/90 text-amber-400"; // Cor ativa
    const defaultClasses = "bg-slate-50 border-slate-200 text-amber-500"; // Cor padrão

    return `w-10 h-10 p-2 rounded-md border transition-all duration-150 ${
      isActive(href) ? activeClasses : defaultClasses
    }`;
  };

  // Função auxiliar para determinar classes do link (cor do texto)
  const getLinkTextClasses = (href) => {
    const activeClasses = "text-slate-800 font-medium"; // Cor ativa e negrito
    const defaultClasses = "text-sm text-slate-700 font-regular"; // Cor padrão

    return `${isActive(href) ? activeClasses : defaultClasses}`;
  };

  return (
    <>
      <aside className="fixed left-0 top-20 z-40 w-68 h-screen bg-white dark:bg-slate-800 p-6 hidden md:block">
        <div className="flex flex-col justify-start items-center h-full">
          {/* User */}
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <Image
              src={
                user.user_metadata?.avatar_url ||
                profile?.avatar_url ||
                `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`
              }
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full border-10 border-slate-100 object-cover"
            />

            <div className="text-center">
              <div className="font-medium">
                {user.user_metadata?.name || profile?.full_name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 w-full">
            <ul className="flex items-center justify-between flex-wrap gap-4">
              <li className="">
                <Link
                  href="/dashboard"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <Home size={18} className={getIconClasses("/dashboard")} />
                  <span className={getLinkTextClasses("/dashboard")}>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tasks"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <List
                    size={18}
                    className={getIconClasses("/dashboard/tasks")}
                  />
                  <span className={getLinkTextClasses("/dashboard/tasks")}>
                    Tasks
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/projects"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <FolderKanban
                    size={18}
                    className={getIconClasses("/dashboard/projects")}
                  />
                  <span className={getLinkTextClasses("/dashboard/projects")}>
                    Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/events"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <CalendarClock
                    size={18}
                    className={getIconClasses("/dashboard/events")}
                  />

                  <span className={getLinkTextClasses("/dashboard/events")}>
                    Events
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <User
                    size={18}
                    className={getIconClasses("/dashboard/profile")}
                  />
                  <span className={getLinkTextClasses("/dashboard/profile")}>
                    Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/settings"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <Settings
                    size={18}
                    className={getIconClasses("/dashboard/settings")}
                  />
                  <span className={getLinkTextClasses("/dashboard/profile")}>
                    Settings
                  </span>
                </Link>
              </li>
              <li>
                <LogoutModal />
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile bottom bar (minimal) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
        <div className="bg-white dark:bg-slate-800 rounded-full shadow-lg p-2 flex gap-2">
          <Link
            href="/dashboard"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <Home size={18} />
          </Link>
          <Link
            href="/dashboard/tasks"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <List size={18} />
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default SidebarLeft;
