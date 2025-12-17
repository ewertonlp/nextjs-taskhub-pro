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
import { useRouter} from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/features/auth/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import toast from "react-hot-toast";



export default function LogoutModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);



  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      setOpen(false);
      router.push("/login");
    } catch (error: unknown) {
      console.error("Logout error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to sign out. Try again.";
      toast.error(message);
      setOpen(false)
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150 cursor-pointer"
      >
        <LogOut size={18} className="w-10 h-10 p-2 rounded-md border text-amber-500 dark:bg-slate-700 dark:border-slate-500" />
        <span className="text-sm text-slate-700 dark:text-slate-300">Logout</span>
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
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleLogout}
              disabled={loading}
              className="bg-red-500 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-500 min-w-[100px] text-white dark:text-slate-900"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white text-white border-t-transparent rounded-full animate-spin" />
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
