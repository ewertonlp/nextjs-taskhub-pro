// types/task.ts

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  status: TaskStatus;
  order: number; 
  user_id: string;
  created_at?: string;
};

export type Columns = Record<TaskStatus, Task[]>;

export const initialColumns: Columns = {
  'todo': [],
  'in_progress': [],
  'done': [],
};

export const columnTitles: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in_progress': 'In Progress',
  'done': 'Done',
};

export const getStatusBadge = (status: TaskStatus) => {
  switch (status) {
    case 'todo':
      return { text: 'bg-red-100 text-red-700', label: 'To Do' };
    case 'in_progress':
      return { text: 'bg-yellow-100 text-yellow-600', label: 'In Progress' };
    case 'done':
      return { text: 'bg-green-100 text-green-700', label: 'Done' };
    default:
      return { text: 'bg-gray-100 text-gray-700', label: 'Undefined' };
  }
};