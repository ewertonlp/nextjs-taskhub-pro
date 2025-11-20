"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TaskService } from "./taskService";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  status: "todo" | "in_progress" | "done";
  order: number;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  return await TaskService.list();
});

export const addTask = createAsyncThunk(
  "tasks/add",
  async (task: Omit<Task, "id" | "created_at">) => {
    return await TaskService.add(task);
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    return await TaskService.update(id, updates);
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string) => {
    await TaskService.remove(id);
    return id;
  }
);

const ensureUniqueTasks = (
  existingTasks: Task[],
  newTask: Task | Task[]
): Task[] => {
  // Converte newTask para um array se for um único objeto
  const newTasksArray = Array.isArray(newTask) ? newTask : [newTask];

  // Cria um mapa com o estado atual + novas tarefas, usando o ID como chave.
  // O último valor (a nova versão) sempre vence.
  const tasksMap = new Map<string, Task>();

  // 1. Adiciona tarefas existentes
  existingTasks.forEach((task) => tasksMap.set(task.id, task));

  // 2. Sobrescreve/adiciona novas/atualizadas
  newTasksArray.forEach((task) => tasksMap.set(task.id, task));

  // Retorna o array de volta, mantendo a ordem aproximada do último estado.
  return Array.from(tasksMap.values());
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        // Usa a função helper para tratar a lista completa de tasks
        state.tasks = ensureUniqueTasks([], action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar tarefas";
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        // Adiciona a nova tarefa, garantindo unicidade.
        // Usamos o helper e colocamos a nova tarefa na frente (unshift).
        const newTasks = ensureUniqueTasks(state.tasks, action.payload);
        state.tasks = [
          action.payload,
          ...newTasks.filter((t) => t.id !== action.payload.id),
        ];
      })

      // 🔄 UPDATE: Atualiza a tarefa existente e elimina duplicatas de forma robusta.
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        // O helper remove a versão antiga e adiciona a nova, mantendo a unicidade.
        state.tasks = ensureUniqueTasks(state.tasks, action.payload);

        // Como a ordem é importante para o Kanban, o KanbanBoard precisa reordenar
        // usando o useMemo (que já está implementado no seu código).
      })

      // 🔄 DELETE: Remove o item normalmente, já que não causa duplicação.
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
