import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DeadlineForm } from '@/components/DeadlineForm';
import { DeadlineList } from '@/components/DeadlineList';
import { useDeadlines } from '@/hooks/useDeadlines';
import type { Deadline, CreateDeadlineDto } from '@/types/deadline';

export default function Index() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);

  const {
    deadlines,
    isLoading,
    createDeadline,
    updateDeadline,
    deleteDeadline,
    isCreating,
    isUpdating,
  } = useDeadlines();

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black mb-8">
            Deadline Tracker
          </h1>

          {/* Simple Form Inline */}
          <div className="mb-8">
            <Button 
              onClick={() => setIsFormOpen(true)} 
              size="lg" 
              className="border-2 border-black bg-orange-500 hover:bg-orange-600 text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Deadline
            </Button>
          </div>
        </div>

        {/* Deadlines List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-foreground font-bold">Loading deadlines...</p>
          </div>
        ) : (
          <DeadlineList
            deadlines={deadlines}
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
