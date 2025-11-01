import { Navbar } from '@/components/layout/Navbar';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { useTasks } from '@/contexts/TaskContext';

const Dashboard = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { tasks } = useTasks();

  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Task Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your tasks efficiently with drag-and-drop
            </p>
          </div>
          <Button onClick={() => setIsCreating(true)} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            New Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">To Do</p>
                <p className="text-3xl font-bold">{todoCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                📋
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                <p className="text-3xl font-bold">{inProgressCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                ⚡
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold">{completedCount}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                ✅
              </div>
            </div>
          </div>
        </div>

        <KanbanBoard />
      </main>

      <TaskDialog open={isCreating} onOpenChange={setIsCreating} />
    </div>
  );
};

export default Dashboard;
