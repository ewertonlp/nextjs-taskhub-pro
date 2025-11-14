import { Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="fixed left-0 top-0 z-50 w-full h-20 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-4 px-8 hidden md:block ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-linear-to-br from-black/70 to-black/90 flex items-center justify-center text-white font-bold">
            TH
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">TaskHub Pro</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Organize your work
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Link
            href="/dashboard/settings"
            className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
          >
            <Settings size={20} />
            
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
