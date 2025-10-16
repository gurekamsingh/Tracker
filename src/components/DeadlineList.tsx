import { useState, useEffect, useRef } from 'react';
import { DeadlineItem } from './DeadlineItem';
import type { Deadline } from '@/types/deadline';
import { sortDeadlinesByUrgency } from '@/utils/deadline';

interface DeadlineListProps {
  deadlines: Deadline[];
  onEdit: (deadline: Deadline) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: 'pending' | 'completed') => void;
}

export function DeadlineList({ deadlines, onEdit, onDelete, onToggleStatus }: DeadlineListProps) {
  const sortedDeadlines = sortDeadlinesByUrgency(deadlines);
  const [newDeadlineId, setNewDeadlineId] = useState<string | null>(null);
  const prevDeadlinesRef = useRef<Deadline[]>([]);

  useEffect(() => {
    // Detect newly added deadline
    if (sortedDeadlines.length > prevDeadlinesRef.current.length) {
      const newDeadline = sortedDeadlines.find(
        (d) => !prevDeadlinesRef.current.find((pd) => pd.id === d.id)
      );
      if (newDeadline) {
        setNewDeadlineId(newDeadline.id);
        setTimeout(() => setNewDeadlineId(null), 500);
      }
    }
    prevDeadlinesRef.current = sortedDeadlines;
  }, [sortedDeadlines]);

  if (sortedDeadlines.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground text-lg font-bold">No deadlines found</p>
        <p className="text-muted-foreground text-sm mt-1">Create your first deadline to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedDeadlines.map((deadline) => (
        <div
          key={deadline.id}
          className={newDeadlineId === deadline.id ? 'animate-bounce-in' : ''}
        >
          <DeadlineItem
            deadline={deadline}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        </div>
      ))}
    </div>
  );
}
