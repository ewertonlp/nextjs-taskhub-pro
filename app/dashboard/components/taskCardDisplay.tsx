"use client"
import { Card } from "@/components/ui/card";

// Tipos de dados 
type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  completed: boolean;
  order: number;
};

interface TaskCardDisplayProps {
  task: Task;
  onClick?: () => void;
}

const getStatusDisplay = (task: Task) => {
  if (task.completed) {
    return { text: "bg-green-100 text-green-800", label: "Done" };
  }

  switch (task.status) {
    case "todo":
      return { text: "bg-red-100 text-red-800", label: "To Do" };
    case "in_progress":
      return { text: "bg-yellow-100 text-yellow-800", label: "In Progress" };
    default:
      return { text: "bg-gray-100 text-gray-800", label: "Undefined" };
  }
};

export function TaskCardDisplay({ task, onClick }: TaskCardDisplayProps) {
  const { text, label } = getStatusDisplay(task);

  return (
    <Card
      onClick={onClick}
      className="p-3 mb-2 cursor-pointer bg-white border border-slate-200 hover:border-amber-500 transition-all duration-150 min-h-32"
    >
      <div className="flex justify-between items-start mb-2">
        <p
          className={`font-medium text-md text-gray-900 ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.title}
        </p>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${text}`}
        >
          {label}
        </span>
      </div>

    
      {task.description && (
        <p className="text-sm text-gray-500 mt-1 line-clamp-3">
          {task.description}
        </p>
      )}
    </Card>
  );
}
