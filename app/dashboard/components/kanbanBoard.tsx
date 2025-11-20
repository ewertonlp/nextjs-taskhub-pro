"use client";

import { useState, useMemo } from "react";
import { Task } from "@/types/tasks";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Columns,
  columnTitles,
  getStatusBadge,
  TaskStatus,
} from "@/types/tasks";
import { TaskEditDialog } from "./taskEditDialog";

// Funções Helpers para Ordenação Otimizada (Gapped Integers)
const calculateNewOrder = (tasks: Task[], destinationIndex: number): number => {
  const previousTask = tasks[destinationIndex - 1];
  const nextTask = tasks[destinationIndex];

  // 1. Início da lista
  if (destinationIndex === 0) {
    return nextTask ? nextTask.order / 2 : 1000;
  }

  // 2. Fim da lista
  if (destinationIndex === tasks.length - 1) {
    return previousTask.order + 1000;
  }

  // 3. Meio da lista
  if (previousTask && nextTask) {
    return (previousTask.order + nextTask.order) / 2;
  }

  return 1000;
};

type KanbanBoardProps = {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
};

export function KanbanBoard({
  tasks,
  onUpdateTask,
  onDeleteTask,
}: KanbanBoardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const supabase = createClient();

  const columns = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      // Sempre criar novas arrays para evitar referência compartilhada
      return {
        todo: [],
        in_progress: [],
        done: [],
      };
    }

    // Garante tasks 100% únicas por ID (solução definitiva)
    const uniqueTasks = Array.from(
      new Map(tasks.map((t) => [t.id, t])).values()
    );

    // Evita referências compartilhadas com initialColumns
    const newColumns: Columns = {
      todo: [],
      in_progress: [],
      done: [],
    };

    // Distribui as tasks nas colunas corretas
    uniqueTasks.forEach((task) => {
      if (task.status in newColumns) {
        newColumns[task.status].push(task);
      }
    });

    //  Ordena as tasks dentro de cada coluna
    (Object.keys(newColumns) as TaskStatus[]).forEach((status) => {
      newColumns[status].sort((a, b) => a.order - b.order);
    });

    return newColumns;
  }, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId as TaskStatus;
    const destinationStatus = destination.droppableId as TaskStatus;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // **NOTA:** O estado local 'columns' NÃO É MAIS USADO para o DND.
    // Usamos 'tasks' (prop) para o cálculo, e o Redux fará a atualização visual.

    const sourceTasks = columns[sourceStatus];
    const taskToMove = sourceTasks.find((t) => t.id === draggableId);

    if (!taskToMove) return;

    // Simulação da nova estrutura de destino para cálculo de order
    const updatedDestinationTasks = [...columns[destinationStatus]];

    // Se o item mudou de coluna, removemos da fonte
    if (sourceStatus !== destinationStatus) {
      // Removemos o item da posição original (apenas na simulação)
      const taskIndex = sourceTasks.findIndex((t) => t.id === draggableId);
      if (taskIndex !== -1) {
        // Clona e remove da lista de origem (apenas para cálculo, não afeta o estado)
      }
    } else {
      // Move dentro da mesma lista (apenas na simulação)
      const [removed] = updatedDestinationTasks.splice(source.index, 1);
      updatedDestinationTasks.splice(destination.index, 0, removed);
    }

    // Insere o item movido na posição de destino para cálculo da nova ordem
    updatedDestinationTasks.splice(destination.index, 0, {
      ...taskToMove,
      status: destinationStatus,
    });

    // ✅ 2. Cálculo da Nova Ordem Otimizada
    const newOrder = calculateNewOrder(
      updatedDestinationTasks,
      destination.index
    );
    const newStatus = destinationStatus;

    // ✅ 3. Atualização no Supabase e Redux
    try {
      // 3a. Update no Supabase
      await supabase
        .from("tasks")
        .update({ status: newStatus, order: newOrder })
        .eq("id", draggableId)
        .select();

      // 3b. Update no Redux (para atualização visual imediata)
      onUpdateTask(draggableId, { status: newStatus, order: newOrder });
    } catch (error) {
      console.error("Erro ao mover tarefa:", error);
      // Em caso de falha, o Redux não é atualizado, e a UI reverte.
    }
  };

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    onUpdateTask(id, { completed: !completed });
  };
  // // --- AQUI que fica o "if (isLoading)" ---
  // if (isLoading) return <div>Loading tasks...</div>;

  // 3. Renderização
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="block lg:flex space-x-6 py-4 overflow-x-auto">
          {Object.entries(columns).map(([status, tasks]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <ScrollArea
                  className="w-96 bg-gray-50 border border-slate-100 rounded-lg p-3 h-[80vh]"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3 className="flex justify-between items-center mb-4 text-lg font-semibold capitalize">
                    {columnTitles[status as Task["status"]]}

                    <span className="px-3 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-md">
                      {tasks.length}
                    </span>
                  </h3>
                  {tasks.map((task, index) => {
                    const { text, label } = getStatusBadge(task.status);
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            className="px-3 py-4 mb-2 cursor-pointer bg-white"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            onClick={() => handleCardClick(task)}
                          >
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-sm">
                                {task.title}
                              </p>
                              <span
                                className="cursor-grab"
                                {...provided.dragHandleProps}
                              >
                                ⠿
                              </span>
                            </div>
                            <div className="">
                              {task.description && (
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {task.description}
                                </p>
                              )}
                            </div>
                            <div className="flex justify-end">
                              <span
                                className={`inline-flex items-end rounded-lg px-2 py-1 text-xs font-medium ${text}`}
                              >
                                {label}
                              </span>
                            </div>
                          </Card>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ScrollArea>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal de Edição */}
      <TaskEditDialog
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdateTask}
        onToggleComplete={handleToggleComplete}
        onDelete={onDeleteTask}
      />
    </>
  );
}
