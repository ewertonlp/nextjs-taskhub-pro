"use client";

import {  usePathname } from "next/navigation";
import AlertsCard from "./components/alertsCard";

function SidebarRight() {
  // const pathname = usePathname();


  // const isActive = (href) => {
  //   if (href === "/") {
  //     return pathname === href;
  //   }
  //   return pathname === href;
  // };

  
  // const getIconClasses = (href) => {
  //   const activeClasses =
  //     "bg-linear-to-br from-black/70 to-black/90 text-slate-100"; 
  //   const defaultClasses = "bg-slate-50 border-slate-200 text-slate-500"; 

  //   return `w-10 h-10 p-2 rounded-md border transition-all duration-150 ${
  //     isActive(href) ? activeClasses : defaultClasses
  //   }`;
  // };
  
  // const getLinkTextClasses = (href) => {
  //   const activeClasses = "text-black/80 font-medium"; 
  //   const defaultClasses = "text-slate-700 font-regular"; 

  //   return `${isActive(href) ? activeClasses : defaultClasses}`;
  // };

  return (
    <>
      <aside className="fixed right-0 top-20 z-40 hidden lg:w-80 h-screen bg-white dark:bg-slate-800 px-2 lg:px-4 py-6 md:block">
        <div className="flex flex-col justify-start items-start h-full">
          <div className="w-full flex flex-col items-center justify-start mb-8 rounded-lg ">
            <AlertsCard />
          </div>

        </div>
      </aside>

     
    </>
  );
}

export default SidebarRight;
