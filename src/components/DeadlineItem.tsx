import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Clock, Trash2, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Deadline } from '@/types/deadline';
import { getUrgencyLevel, getTimeRemaining, type UrgencyLevel } from '@/utils/deadline';
import { cn } from '@/lib/utils';

interface DeadlineItemProps {
  deadline: Deadline;
  onEdit: (deadline: Deadline) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: 'pending' | 'completed') => void;
}

const urgencyDotColors: Record<UrgencyLevel, string> = {
  overdue: 'bg-red-500',
  urgent: 'bg-red-500',
  safe: 'bg-yellow-500',
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
      'p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200',
      'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]',
      'animate-slide-up'
    )}>
      <div className="flex items-start gap-3">
        {/* Status Dot */}
        <div className="mt-1.5">
          <div className={cn(
            'h-3 w-3 rounded-full',
            urgencyDotColors[urgency]
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={cn(
              'font-bold text-lg',
              isCompleted && 'line-through text-gray-500'
            )}>
              {deadline.title}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleStatus}
              className="border-2 border-black bg-yellow-300 hover:bg-yellow-400 font-bold shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              {isCompleted ? 'Undo' : 'Done'}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
            <span>Due: {format(new Date(deadline.due_date), 'yyyy-MM-dd')}</span>
          </div>

          {deadline.description && (
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
              {deadline.description}
            </p>
          )}
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(deadline)}
            className="h-8 w-8 hover:bg-yellow-200"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(deadline.id)}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
