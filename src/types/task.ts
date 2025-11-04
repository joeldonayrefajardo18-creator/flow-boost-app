export type TaskStatus = string;
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Column {
  id: string;
  title: string;
  color: string;
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}
