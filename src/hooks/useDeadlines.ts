import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deadlineApi } from '@/services/api';
import type { CreateDeadlineDto, UpdateDeadlineDto } from '@/types/deadline';
import { toast } from '@/hooks/use-toast';

const DEADLINES_KEY = ['deadlines'];

export function useDeadlines() {
  const queryClient = useQueryClient();

  const { data: deadlines = [], isLoading, error } = useQuery({
    queryKey: DEADLINES_KEY,
    queryFn: deadlineApi.getAll,
    refetchInterval: 30000, // Refetch every 30s to keep timers accurate
  });

  const createMutation = useMutation({
    mutationFn: deadlineApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEADLINES_KEY });
      toast({
        title: 'Success',
        description: 'Deadline created successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create deadline',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDeadlineDto }) =>
      deadlineApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEADLINES_KEY });
      toast({
        title: 'Success',
        description: 'Deadline updated successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update deadline',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deadlineApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEADLINES_KEY });
      toast({
        title: 'Success',
        description: 'Deadline deleted successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete deadline',
        variant: 'destructive',
      });
    },
  });

  return {
    deadlines,
    isLoading,
    error,
    createDeadline: createMutation.mutate,
    updateDeadline: updateMutation.mutate,
    deleteDeadline: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
