import { Task, User, Column } from '@/types/task';

const TASKS_KEY = 'taskflow_tasks';
const USER_KEY = 'taskflow_user';
const THEME_KEY = 'taskflow_theme';
const COLUMNS_KEY = 'taskflow_columns';

export const storage = {
  // Tasks
  getTasks: (): Task[] => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  // User
  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  saveUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light';
  },

  saveTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, theme);
  },

  // Columns
  getColumns: (): Column[] => {
    const columns = localStorage.getItem(COLUMNS_KEY);
    return columns ? JSON.parse(columns) : [];
  },

  saveColumns: (columns: Column[]): void => {
    localStorage.setItem(COLUMNS_KEY, JSON.stringify(columns));
  },
};
