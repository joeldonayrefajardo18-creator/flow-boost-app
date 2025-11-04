import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { TaskStatus } from '@/types/task';
import { useTasks } from '@/contexts/TaskContext';
import { useColumns } from '@/contexts/ColumnContext';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { Plus, Settings2, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import { TaskDialog } from './TaskDialog';
import { ColumnDialog } from '@/components/columns/ColumnDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const KanbanBoard = () => {
  const { tasks, moveTask } = useTasks();
  const { columns, deleteColumn } = useColumns();
  const [isCreating, setIsCreating] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [deletingColumn, setDeletingColumn] = useState<string | null>(null);
  const [createStatus, setCreateStatus] = useState<TaskStatus>('');

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    moveTask(draggableId, destination.droppableId as TaskStatus);
  };

  const handleAddTask = (status: TaskStatus) => {
    setCreateStatus(status);
    setIsCreating(true);
  };

  const handleEditColumn = (columnId: string) => {
    setEditingColumn(columnId);
  };

  const handleDeleteColumn = () => {
    if (deletingColumn) {
      deleteColumn(deletingColumn);
      setDeletingColumn(null);
    }
  };

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start gap-6 overflow-x-auto pb-4">
          {sortedColumns.map((column) => {
            const columnTasks = tasks.filter((task) => task.status === column.id);

            return (
              <div key={column.id} className="flex flex-col animate-slide-up min-w-[320px] max-w-[320px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                    <h3 className="font-semibold text-lg">{column.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      ({columnTasks.length})
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleAddTask(column.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Settings2 className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditColumn(column.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Column
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeletingColumn(column.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Column
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-3 p-4 rounded-lg border-2 border-dashed min-h-[500px] transition-colors ${
                        snapshot.isDraggingOver
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card/50'
                      }`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}

          {/* Add Column Button */}
          <div className="min-w-[320px] max-w-[320px]">
            <Button
              variant="outline"
              className="w-full h-12 border-dashed"
              onClick={() => setIsAddingColumn(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </Button>
          </div>
        </div>
      </DragDropContext>

      <TaskDialog
        open={isCreating}
        onOpenChange={setIsCreating}
        defaultStatus={createStatus}
      />

      <ColumnDialog
        open={isAddingColumn}
        onOpenChange={setIsAddingColumn}
      />

      <ColumnDialog
        open={editingColumn !== null}
        onOpenChange={(open) => !open && setEditingColumn(null)}
        column={columns.find(c => c.id === editingColumn)}
      />

      <AlertDialog open={deletingColumn !== null} onOpenChange={(open) => !open && setDeletingColumn(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Column</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this column? All tasks in this column will remain but will need to be reassigned to another column.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteColumn}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
