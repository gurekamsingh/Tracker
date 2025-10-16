export type Priority = 'high' | 'medium' | 'low';
export type Status = 'pending' | 'completed';

export interface Deadline {
  id: string;
  title: string;
  description?: string;
  due_date: string; // ISO timestamp
  priority: Priority;
  status: Status;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDeadlineDto {
  title: string;
  description?: string;
  due_date: string;
  priority: Priority;
  status?: Status;
}

export interface UpdateDeadlineDto {
  title?: string;
  description?: string;
  due_date?: string;
  priority?: Priority;
  status?: Status;
}
