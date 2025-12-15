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

const calculateNewOrder = (tasks: Task[], destinationIndex: number): number => {
  const previousTask = tasks[destinationIndex - 1];
  const nextTask = tasks[destinationIndex];


  if (destinationIndex === 0) {
    return nextTask ? nextTask.order / 2 : 1000;
  }

  if (destinationIndex === tasks.length - 1) {
    return previousTask.order + 1000;
  }

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
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient();

  const columns = useMemo(() => {
    if (!tasks || tasks.length === 0) {
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

    const newColumns: Columns = {
      todo: [],
      in_progress: [],
      done: [],
    };

    uniqueTasks.forEach((task) => {
      if (task.status in newColumns) {
        newColumns[task.status].push(task);
      }
    });

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

   
    const sourceTasks = columns[sourceStatus];
    const taskToMove = sourceTasks.find((t) => t.id === draggableId);

    if (!taskToMove) return;
    const updatedDestinationTasks = [...columns[destinationStatus]];

    if (sourceStatus !== destinationStatus) {
     
      const taskIndex = sourceTasks.findIndex((t) => t.id === draggableId);
      if (taskIndex !== -1) {
 
      }
    } else {
      
      const [removed] = updatedDestinationTasks.splice(source.index, 1);
      updatedDestinationTasks.splice(destination.index, 0, removed);
    }

  
    updatedDestinationTasks.splice(destination.index, 0, {
      ...taskToMove,
      status: destinationStatus,
    });

    const newOrder = calculateNewOrder(
      updatedDestinationTasks,
      destination.index
    );
    const newStatus = destinationStatus;

    //  Atualização no Supabase e Redux
    try {

      await supabase
        .from("tasks")
        .update({ status: newStatus, order: newOrder })
        .eq("id", draggableId)
        .select();
      onUpdateTask(draggableId, { status: newStatus, order: newOrder });
    } catch (error) {
      console.error("Erro ao mover tarefa:", error);
      
    }
  };

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    onUpdateTask(id, { completed: !completed });
  };

 
  if (isLoading) return <div>Loading tasks...</div>;
 
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="block xl:flex space-y-6 space-x-6 pt-4 pb-20 overflow-x-auto">
          {Object.entries(columns).map(([status, tasks]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <ScrollArea
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-500 rounded-lg p-3 h-auto"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3 className="flex justify-between items-center mb-4 text-lg font-normal dark:text-slate-300 text-slate-800 capitalize">
                    {columnTitles[status as Task["status"]]}

                    <span className="px-2 py-1 bg-amber-100 text-amber-600 dark:bg-amber-600 dark:text-amber-50 text-xs rounded-full">
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
                            className="p-3 mb-4 cursor-pointer bg-white dark:bg-slate-900 dark:border-slate-500"
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
                                <p className="text-xs text-gray-700 dark:text-slate-200 line-clamp-2">
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
