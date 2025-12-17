"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
// import { logout } from "../features/auth/authSlice";
import router from "next/router";
import { useAppSelector } from "../store/hooks";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  Task,
} from "../auth/tasks/taskSlice";
import Link from "next/link";
import { TaskCardDisplay } from "./components/taskCardDisplay";
import { TaskEditDialog } from "./components/taskEditDialog";
import { KanbanBoard } from "./components/kanbanBoard";
import { ClientOnly } from "./components/clientOnly";

export default function DashboardClient({ user, profile }: any) {
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  // const handleLogout = async () => {
  //   dispatch(logout());
  //   router.push("login");
  // };

  const handleCardClick = (task: Task) => {
    setIsModalOpen(true);
    setSelectedTask(task);
  };

  const handleSaveTask = (id: string, updates: Partial<Task>) => {
    dispatch(updateTask({ id, updates }));
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    dispatch(updateTask({ id, updates: { completed: !completed } }));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="p-1 lg:p-4 mt-22 md:mt-4">
      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 border border-slate-200 dark:border-slate-500">
        <h1 className="text-2xl">Hi, {user.user_metadata?.name}</h1>
      </div>

      <div className="my-8 px-1 py-2">
        <div className="my-2 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Tasks</h2>
          <Link
            href="/dashboard/tasks"
            className="text-sm font-regular text-amber-500 hover:underline transition-all duration-150"
          >
            See All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-slate-500" />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400">
            No tasks to show
          </p>
        ) : (
          <>
            {tasks.length > 0 && (
              <ClientOnly>
                <KanbanBoard
                  tasks={tasks}
                  onUpdateTask={handleSaveTask}
                  onDeleteTask={handleDeleteTask}
                />
              </ClientOnly>
            )}
          </>
        )}
      </div>
    </div>
  );
}
