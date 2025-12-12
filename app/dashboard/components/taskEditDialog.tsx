// components/TaskEditDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Task, TaskStatus } from "@/types/tasks";

interface TaskEditDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Task>) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskEditDialog({
  task,
  isOpen,
  onClose,
  onSave,
  onToggleComplete,
  onDelete,
}: TaskEditDialogProps) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>("todo");

  useEffect(() => {
    if (task) {
      setCurrentTitle(task.title);
      setCurrentDescription(task.description);
      setCurrentStatus(task.status);
    }
  }, [task]);

  if (!task) return null;

  const handleSave = () => {
    // 1. Atualização do Supabase (Ação no Redux)
    onSave(task.id, {
      title: currentTitle,
      description: currentDescription,
      status: currentStatus,
    });
    // 2. Fechar o Modal
    onClose();
  };

  const handleDeleteClick = () => {
    if (confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleToggleClick = () => {
    onToggleComplete(task.id, task.completed);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-8">
            <span className="text-xl">Edit Task</span>

            <button
              onClick={handleToggleClick}
              className="ml-2 flex items-center gap-2  text-gray-500 hover:text-green-600 transition-colors cursor-pointer"
            >
              {task.completed ? (
                <>
                  <CheckCircle2 className="text-green-500 w-5 h-5" /> Done
                </>
              ) : (
                <>
                  <Circle className="text-gray-400 w-5 h-5" /> Mark as done
                </>
              )}
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid py-4">
          <div className="space-y-2 mb-8">
            <label className="text-sm font-medium">Title</label>
            <Input
              id="title"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              className="h-20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium mr-4">Status</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as TaskStatus)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center pt-8">
          <Button
            variant="ghost"
            onClick={handleDeleteClick}
            className="text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <div>
            <Button variant="outline" onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
