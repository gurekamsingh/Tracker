import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Priority, Status } from '@/types/deadline';
import { cn } from '@/lib/utils';

export interface Filters {
  priority: Priority | 'all';
  status: Status | 'all';
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  counts: {
    all: number;
    pending: number;
    completed: number;
    high: number;
    medium: number;
    low: number;
  };
}

export function FilterBar({ filters, onFilterChange, counts }: FilterBarProps) {
  const statusFilters: Array<{ value: Status | 'all'; label: string; count: number }> = [
    { value: 'all', label: 'All', count: counts.all },
    { value: 'pending', label: 'Pending', count: counts.pending },
    { value: 'completed', label: 'Completed', count: counts.completed },
  ];

  const priorityFilters: Array<{ value: Priority | 'all'; label: string; count: number }> = [
    { value: 'all', label: 'All Priorities', count: counts.all },
    { value: 'high', label: 'High', count: counts.high },
    { value: 'medium', label: 'Medium', count: counts.medium },
    { value: 'low', label: 'Low', count: counts.low },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={filters.status === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                onFilterChange({ ...filters, status: filter.value })
              }
              className="gap-2"
            >
              {filter.label}
              <Badge variant="secondary" className="ml-1">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Priority</h3>
        <div className="flex flex-wrap gap-2">
          {priorityFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={filters.priority === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                onFilterChange({ ...filters, priority: filter.value })
              }
              className={cn(
                'gap-2',
                filter.value === 'high' && filters.priority === 'high' && 'bg-priority-high hover:bg-priority-high',
                filter.value === 'medium' && filters.priority === 'medium' && 'bg-priority-medium hover:bg-priority-medium',
                filter.value === 'low' && filters.priority === 'low' && 'bg-priority-low hover:bg-priority-low'
              )}
            >
              {filter.label}
              <Badge variant="secondary" className="ml-1">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
