"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
  Task,
} from "../../auth/tasks/taskSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "../components/kanbanBoard";
import { TaskEditDialog } from "../components/taskEditDialog";
import { ClientOnly } from "../components/clientOnly";

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const user = useAppSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks());
    }
  }, [dispatch, user]);

  const handleAdd = async () => {
    if (!title.trim()) return;
    if (!user) return alert("Voce precisa estar logado");

    await dispatch(
      addTask({
        title,
        description,
        user_id: user.id,
        completed: false,
        status: "todo",
        order: 0,
      })
    );

    setTitle("");
    setDescription("");
  };

  const handleCardClick = (task: Task) => {
    setIsModalOpen(true);
    setSelectedTask(task);
    console.log("Modal deve abrir para a tarefa:", task.title);
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
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-gray-100">
        My tasks
      </h1>

      {/* Formulário */}
      <div className="flex gap-2 mb-6 p-6 bg-slate-50 rounded-lg border border-slate-100">
        <Input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white dark:bg-slate-600"
        />
        <Input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white dark:bg-slate-600"
        />

        <Button onClick={handleAdd}>Create Task</Button>
      </div>

      <ClientOnly>
        <KanbanBoard
          tasks={tasks}
          onUpdateTask={handleSaveTask}
          onDeleteTask={handleDeleteTask}
        />
      </ClientOnly>

      <TaskEditDialog
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
