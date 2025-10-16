import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock, CheckCircle2, Circle, Trash2, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Deadline } from '@/types/deadline';
import { getUrgencyLevel, getTimeRemaining, type UrgencyLevel } from '@/utils/deadline';
import { cn } from '@/lib/utils';

interface DeadlineItemProps {
  deadline: Deadline;
  onEdit: (deadline: Deadline) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: 'pending' | 'completed') => void;
}

const urgencyStyles: Record<UrgencyLevel, string> = {
  overdue: 'border-l-4 border-l-urgency-overdue',
  urgent: 'border-l-4 border-l-urgency-urgent',
  safe: 'border-l-4 border-l-urgency-safe',
};

const priorityColors = {
  high: 'bg-priority-high text-white',
  medium: 'bg-priority-medium text-white',
  low: 'bg-priority-low text-white',
};

export function DeadlineItem({ deadline, onEdit, onDelete, onToggleStatus }: DeadlineItemProps) {
  const [timeRemaining, setTimeRemaining] = useState('');
  const urgency = getUrgencyLevel(deadline.due_date);
  const isCompleted = deadline.status === 'completed';

  useEffect(() => {
    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(deadline.due_date));
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [deadline.due_date]);

  const handleToggleStatus = () => {
    onToggleStatus(deadline.id, isCompleted ? 'pending' : 'completed');
  };

  return (
    <Card className={cn(
      'p-4 transition-all hover:shadow-md',
      urgencyStyles[urgency],
      isCompleted && 'opacity-60'
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleStatus}
          className="mt-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-status-completed" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={cn(
              'font-semibold text-lg',
              isCompleted && 'line-through text-muted-foreground'
            )}>
              {deadline.title}
            </h3>
            <Badge className={cn(priorityColors[deadline.priority], 'shrink-0')}>
              {deadline.priority}
            </Badge>
          </div>

          {deadline.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {deadline.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={cn(
                'font-medium',
                urgency === 'overdue' && 'text-urgency-overdue',
                urgency === 'urgent' && 'text-urgency-urgent',
                urgency === 'safe' && 'text-muted-foreground'
              )}>
                {timeRemaining}
              </span>
            </div>

            <span className="text-muted-foreground">
              {format(new Date(deadline.due_date), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(deadline)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(deadline.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
