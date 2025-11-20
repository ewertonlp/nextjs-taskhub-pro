// components/TaskEditDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Task, TaskStatus } from '@/types/tasks';

interface TaskEditDialogProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Task>) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskEditDialog({ task, isOpen, onClose, onSave, onToggleComplete, onDelete }: TaskEditDialogProps) {
  
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>('todo');

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
        status: currentStatus
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
    // Não fecha o modal, pois o usuário pode querer continuar editando.
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl">Editar Tarefa</span>
            
            <button onClick={handleToggleClick} className="ml-2 flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors">
              {task.completed ? (
                <>
                    <CheckCircle2 className="text-green-500 w-5 h-5" /> Concluída
                </>
              ) : (
                <>
                    <Circle className="text-gray-400 w-5 h-5" /> Marcar como Concluída
                </>
              )}
            </button>

          </DialogTitle>
          <DialogDescription>
            ID: {task.id.substring(0, 8)}...
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <label className="text-sm font-medium">Título</label>
          <Input 
            id="title" 
            value={currentTitle} 
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
          
          <label className="text-sm font-medium">Descrição</label>
          <Textarea 
            id="description" 
            value={currentDescription} 
            onChange={(e) => setCurrentDescription(e.target.value)}
            placeholder="Descrição (opcional)"
            className="h-20" 
          />
          
          <label className="text-sm font-medium">Status da Coluna</label>
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value as TaskStatus)}
            className="p-2 border rounded-md"
          >
            <option value="todo">A Fazer</option>
            <option value="in_progress">Em Progresso</option>
            <option value="done">Concluído</option>
          </select>

        </div>

        <DialogFooter className="flex justify-between items-center">
            <Button variant="ghost" onClick={handleDeleteClick} className="text-red-500 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Tarefa
            </Button>
            <div>
                <Button variant="outline" onClick={onClose} className="mr-2">Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}