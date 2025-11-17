"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { logout } from "../features/auth/authSlice";
import router from "next/router";
import { useAppSelector } from "../store/hooks";
import { CheckCircle2, Circle, Loader2, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { fetchTasks } from "../auth/tasks/taskSlice";
import Link from "next/link";

export default function DashboardClient({ user, profile }: any) {
   const { tasks, loading } = useAppSelector((state) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  
    useEffect(() => {
      if (user) {
        dispatch(fetchTasks());
      }
    }, [dispatch, user]);

  const handleLogout = async () => {
    dispatch(logout());
    router.push("login")
  };

  return (
    <div className="p-6">

      <div className="bg-slate-50 rounded-lg p-6 border border-slate-100">

      <h1 className="text-2xl">Olá, {user.email}</h1>

      {/* <pre>{JSON.stringify(profile, null, 2)}</pre> */}

      {/* <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-md mt-6 cursor-pointer"
      >
        Logout
      </button> */}
      </div>

      <div className="my-8 px-6 py-4 bg-slate-50 rounded-lg border border-slate-100">  
        <div className="my-4 flex justify-between items-center">
          <Link href='/dashboard/tasks' className="text-xl font-semibold text-slate-700">Tasks</Link>
          <Link href='/dashboard/tasks' className="text-md font-regular text-amber-500 hover:underline transition-all duration-150">View all</Link>

        </div>
        
        {loading ? (
        <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-slate-500" />
        </div>
      ): tasks.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma tarefa encontrada</p>

      ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap">
        {tasks.map((task) => (
          <div key={task.id} className=" bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg hover:border-amber-500 transition-all duration-150 min-h-32 overflow-hidden cursor-pointer ">
            <div>
              <h3 className={`px-4 py-1 font-medium text-lg mb-1 bg-linear-to-r from-slate-700 to-slate-900 text-slate-100 dark:bg-linear-to-r dark:from-black/15 dark:to-black/25 dark:text-slate-800`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="px-4 py-1 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{task.description}</p>
              )}
            </div>
            <div className="px-4 py-1 mt-2 text-xs">
                    Status: 
                    <span className={`font-semibold ml-1 ${task.completed ? "text-green-600 dark:text-green-400" : "text-amber-500 dark:text-amber-500"}`}>
                      {task.completed ? "Concluída" : "Pendente"}
                    </span>
                  </div>
                </div>
            
        ))}
       </div>
      )}</div>
    </div>
  );
}
