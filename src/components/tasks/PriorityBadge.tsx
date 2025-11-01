import { TaskPriority } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp, Minus } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = {
    high: {
      label: 'High',
      icon: AlertCircle,
      className: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
    },
    medium: {
      label: 'Medium',
      icon: TrendingUp,
      className: 'bg-warning/10 text-warning hover:bg-warning/20',
    },
    low: {
      label: 'Low',
      icon: Minus,
      className: 'bg-success/10 text-success hover:bg-success/20',
    },
  };

  const { label, icon: Icon, className } = config[priority];

  return (
    <Badge variant="outline" className={className}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  );
};
