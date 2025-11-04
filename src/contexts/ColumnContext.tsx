import React, { createContext, useContext, useState, useEffect } from 'react';
import { Column } from '@/types/task';
import { storage } from '@/lib/storage';
import { toast } from 'sonner';

interface ColumnContextType {
  columns: Column[];
  addColumn: (column: Omit<Column, 'id' | 'order'>) => void;
  updateColumn: (id: string, updates: Partial<Column>) => void;
  deleteColumn: (id: string) => void;
  reorderColumns: (columns: Column[]) => void;
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

const defaultColumns: Column[] = [
  { id: 'todo', title: 'To Do', color: 'bg-muted', order: 0 },
  { id: 'in-progress', title: 'In Progress', color: 'bg-warning/10', order: 1 },
  { id: 'completed', title: 'Completed', color: 'bg-success/10', order: 2 },
];

export const ColumnProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    const savedColumns = storage.getColumns();
    setColumns(savedColumns.length > 0 ? savedColumns : defaultColumns);
  }, []);

  useEffect(() => {
    if (columns.length > 0) {
      storage.saveColumns(columns);
    }
  }, [columns]);

  const addColumn = (columnData: Omit<Column, 'id' | 'order'>) => {
    const newColumn: Column = {
      ...columnData,
      id: Date.now().toString(),
      order: columns.length,
    };
    setColumns(prev => [...prev, newColumn]);
    toast.success('Column added successfully!');
  };

  const updateColumn = (id: string, updates: Partial<Column>) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === id ? { ...col, ...updates } : col
      )
    );
    toast.success('Column updated!');
  };

  const deleteColumn = (id: string) => {
    setColumns(prev => prev.filter(col => col.id !== id));
    toast.success('Column deleted!');
  };

  const reorderColumns = (newColumns: Column[]) => {
    setColumns(newColumns);
  };

  return (
    <ColumnContext.Provider value={{ columns, addColumn, updateColumn, deleteColumn, reorderColumns }}>
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumns = () => {
  const context = useContext(ColumnContext);
  if (context === undefined) {
    throw new Error('useColumns must be used within a ColumnProvider');
  }
  return context;
};
