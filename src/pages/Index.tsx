import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DeadlineForm } from '@/components/DeadlineForm';
import { DeadlineList } from '@/components/DeadlineList';
import { FilterBar, type Filters } from '@/components/FilterBar';
import { useDeadlines } from '@/hooks/useDeadlines';
import type { Deadline, CreateDeadlineDto } from '@/types/deadline';

export default function Index() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
  const [filters, setFilters] = useState<Filters>({ priority: 'all', status: 'all' });

  const {
    deadlines,
    isLoading,
    createDeadline,
    updateDeadline,
    deleteDeadline,
    isCreating,
    isUpdating,
  } = useDeadlines();

  const filteredDeadlines = useMemo(() => {
    return deadlines.filter((deadline) => {
      if (filters.status !== 'all' && deadline.status !== filters.status) return false;
      if (filters.priority !== 'all' && deadline.priority !== filters.priority) return false;
      return true;
    });
  }, [deadlines, filters]);

  const counts = useMemo(() => {
    return {
      all: deadlines.length,
      pending: deadlines.filter((d) => d.status === 'pending').length,
      completed: deadlines.filter((d) => d.status === 'completed').length,
      high: deadlines.filter((d) => d.priority === 'high').length,
      medium: deadlines.filter((d) => d.priority === 'medium').length,
      low: deadlines.filter((d) => d.priority === 'low').length,
    };
  }, [deadlines]);

  const handleCreateDeadline = (data: CreateDeadlineDto) => {
    createDeadline(data);
    setIsFormOpen(false);
  };

  const handleUpdateDeadline = (data: CreateDeadlineDto) => {
    if (editingDeadline) {
      updateDeadline({ id: editingDeadline.id, data });
      setEditingDeadline(null);
    }
  };

  const handleEdit = (deadline: Deadline) => {
    setEditingDeadline(deadline);
  };

  const handleToggleStatus = (id: string, status: 'pending' | 'completed') => {
    updateDeadline({ id, data: { status } });
  };

  const handleCancelEdit = () => {
    setEditingDeadline(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Deadline Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                Stay on top of your deadlines with real-time countdown tracking
              </p>
            </div>
            <Button onClick={() => setIsFormOpen(true)} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Deadline
            </Button>
          </div>

          <FilterBar filters={filters} onFilterChange={setFilters} counts={counts} />
        </div>

        {/* Deadlines List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading deadlines...</p>
          </div>
        ) : (
          <DeadlineList
            deadlines={filteredDeadlines}
            onEdit={handleEdit}
            onDelete={deleteDeadline}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {/* Create Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Deadline</DialogTitle>
            </DialogHeader>
            <DeadlineForm
              onSubmit={handleCreateDeadline}
              onCancel={handleCancelEdit}
              isLoading={isCreating}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editingDeadline} onOpenChange={() => setEditingDeadline(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Deadline</DialogTitle>
            </DialogHeader>
            {editingDeadline && (
              <DeadlineForm
                onSubmit={handleUpdateDeadline}
                onCancel={handleCancelEdit}
                isLoading={isUpdating}
                defaultValues={{
                  title: editingDeadline.title,
                  description: editingDeadline.description,
                  due_date: editingDeadline.due_date.slice(0, 16),
                  priority: editingDeadline.priority,
                }}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
