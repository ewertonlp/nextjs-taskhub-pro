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
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertsCard from "./components/alertsCard";

function SidebarRight({ user, profile }: any) {
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
      "bg-linear-to-br from-black/70 to-black/90 text-slate-100"; // Cor ativa
    const defaultClasses = "bg-slate-50 border-slate-200 text-slate-500"; // Cor padrão

    return `w-10 h-10 p-2 rounded-md border transition-all duration-150 ${
      isActive(href) ? activeClasses : defaultClasses
    }`;
  };

  // Função auxiliar para determinar classes do link (cor do texto)
  const getLinkTextClasses = (href) => {
    const activeClasses = "text-black/80 font-medium"; // Cor ativa e negrito
    const defaultClasses = "text-slate-700 font-regular"; // Cor padrão

    return `${isActive(href) ? activeClasses : defaultClasses}`;
  };

  return (
    <>
      <aside className="fixed right-0 top-20 z-40 hidden lg:w-80 h-screen bg-white dark:bg-slate-800 pr-4 py-6 md:block">
        <div className="flex flex-col justify-start items-start h-full">
          {/* Alerts */}
          <div className="w-full flex flex-col items-center justify-start mb-8 bg-slate-50 rounded-lg border border-slate-200">
            <AlertsCard />
          </div>

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

export default SidebarRight;
