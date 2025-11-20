"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter, usePathname  } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/features/auth/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import toast from "react-hot-toast";

export default function LogoutModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const loading = useSelector((state: RootState) => state.auth.loading);

    const handleLogout = async () => {
    // 1) Fecha o modal e espera a animação
    setOpen(false);
    await new Promise((r) => setTimeout(r, 160));

    try {
      // 2) Dispatch do thunk e espera ele completar (unwrap lança se rejeitado)
      await dispatch(logout()).unwrap?.();
      toast.success("You have been signed out.");
      setTimeout(() => {
        router.push("/login");
      }, 350);
    } catch (err: any) {
      console.error("Logout error:", err);
      toast.error(err?.message ?? "Failed to sign out. Try again.");
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
      "bg-linear-to-br from-black/70 to-black/90 text-amber-300"; // Cor ativa
    const defaultClasses = "bg-slate-50 border-slate-200 text-amber-500"; // Cor padrão

    return `w-10 h-10 p-2 rounded-md border transition-all duration-150 ${
      isActive(href) ? activeClasses : defaultClasses
    }`;
  };

   const getLinkTextClasses = (href) => {
    const activeClasses = "text-black/80 font-medium"; // Cor ativa e negrito
    const defaultClasses = "text-slate-700 font-regular"; // Cor padrão

    return `${isActive(href) ? activeClasses : defaultClasses}`;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150 cursor-pointer"
      >
        <LogOut size={18} className={getIconClasses("/dashboard/logout")}/>
        <span className={getLinkTextClasses("/dashboard/logout")}>Logout</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm animate-in fade-in zoom-in">
          <DialogHeader>
            <DialogTitle>Ready to sign out?</DialogTitle>
            <DialogDescription>
              You will be logged out and redirected to the login page.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>

            <Button
              onClick={handleLogout}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 min-w-[100px]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing out...
                </div>
              ) : (
                "Sign Out"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
