import { useState, useEffect } from 'react';
import { Column } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useColumns } from '@/contexts/ColumnContext';

interface ColumnDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  column?: Column;
}

const colorOptions = [
  { value: 'bg-muted', label: 'Gray' },
  { value: 'bg-primary/10', label: 'Primary' },
  { value: 'bg-warning/10', label: 'Yellow' },
  { value: 'bg-success/10', label: 'Green' },
  { value: 'bg-destructive/10', label: 'Red' },
  { value: 'bg-blue-500/10', label: 'Blue' },
  { value: 'bg-purple-500/10', label: 'Purple' },
  { value: 'bg-pink-500/10', label: 'Pink' },
];

export const ColumnDialog = ({ open, onOpenChange, column }: ColumnDialogProps) => {
  const { addColumn, updateColumn } = useColumns();
  const [formData, setFormData] = useState({
    title: '',
    color: 'bg-muted',
  });

  useEffect(() => {
    if (column) {
      setFormData({
        title: column.title,
        color: column.color,
      });
    } else {
      setFormData({
        title: '',
        color: 'bg-muted',
      });
    }
  }, [column, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (column) {
      updateColumn(column.id, formData);
    } else {
      addColumn(formData);
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{column ? 'Edit Column' : 'Add New Column'}</DialogTitle>
            <DialogDescription>
              {column ? 'Update your column details.' : 'Create a new status column for your tasks.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Column Title *</Label>
              <Input
                id="title"
                placeholder="e.g., In Review, Testing, Done..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Column Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: option.value })}
                    className={`h-10 rounded-md border-2 transition-all ${option.value} ${
                      formData.color === option.value
                        ? 'border-primary scale-110'
                        : 'border-border hover:scale-105'
                    }`}
                    title={option.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.title.trim()}>
              {column ? 'Update Column' : 'Add Column'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
