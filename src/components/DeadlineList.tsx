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

  if (sortedDeadlines.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No deadlines found</p>
        <p className="text-muted-foreground text-sm mt-1">Create your first deadline to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedDeadlines.map((deadline) => (
        <DeadlineItem
          key={deadline.id}
          deadline={deadline}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
