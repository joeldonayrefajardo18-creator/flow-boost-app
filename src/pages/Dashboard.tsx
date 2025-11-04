import { Navbar } from '@/components/layout/Navbar';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { useTasks } from '@/contexts/TaskContext';
import { useColumns } from '@/contexts/ColumnContext';

const Dashboard = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { tasks } = useTasks();
  const { columns } = useColumns();

  const getColumnStats = () => {
    return columns.map(col => ({
      ...col,
      count: tasks.filter(t => t.status === col.id).length,
    }));
  };

  const columnStats = getColumnStats();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {columnStats.map((stat, index) => (
            <div key={stat.id} className="p-6 rounded-lg border bg-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.count}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center text-2xl`}>
                  {index === 0 ? '📋' : index === 1 ? '⚡' : index === 2 ? '✅' : '📊'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <KanbanBoard />
      </main>

      <TaskDialog open={isCreating} onOpenChange={setIsCreating} />
    </div>
  );
};

export default Dashboard;
