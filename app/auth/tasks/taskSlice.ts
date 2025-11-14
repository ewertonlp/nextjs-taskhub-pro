"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TaskService } from "./taskService";

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    user_id: string;
    created_at: string;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
}

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
    return await TaskService.list()
})

export const addTask = createAsyncThunk("tasks/add", async (task: Omit<Task, "id" | "created_at">) => {
    return await TaskService.add(task)
})

export const updateTask = createAsyncThunk("tasks/update", async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
  return await TaskService.update(id, updates);
});

export const deleteTask = createAsyncThunk("tasks/delete", async (id: string) => {
    await TaskService.remove(id)
    return id
})

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar tarefas";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index >= 0) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;