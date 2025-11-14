"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTask, deleteTask, fetchTasks, updateTask } from "../../auth/tasks/taskSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Loader2, Trash2 } from "lucide-react";

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const user = useAppSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      })
    );

    setTitle("");
    setDescription("");
  };

  const handleToggle = (id: string, completed: boolean) => {
    dispatch(updateTask({ id, updates: { completed: !completed } }));
  };

   const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-center text-slate-800 dark:text-gray-100">Minhas Tarefas</h1>

      {/* Formulário */}
      <div className="flex flex-col gap-2 mb-6">
        <Input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleAdd}>Adicionar</Button>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-slate-500" />
        </div>
      ): tasks.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma tarefa encontrada</p>

      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <button onClick={() => handleToggle(task.id, task.completed)}>
                  {task.completed ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-400" />
                  )}
                </button>
                <div>
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : "text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                  )}
                </div>
              </div>

              <button onClick={() => handleDelete(task.id)}>
                <Trash2 className="text-red-500 hover:text-red-600 transition-colors" />
              </button>
            </li>
          ))}
        </ul>
      )}


    </div>
  );
}
