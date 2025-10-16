import { differenceInHours, differenceInMinutes, differenceInSeconds, isPast, parseISO } from 'date-fns';
import type { Deadline } from '@/types/deadline';

export type UrgencyLevel = 'overdue' | 'urgent' | 'safe';

export function getUrgencyLevel(dueDate: string): UrgencyLevel {
  const date = parseISO(dueDate);
  
  if (isPast(date)) {
    return 'overdue';
  }
  
  const hoursUntilDue = differenceInHours(date, new Date());
  
  if (hoursUntilDue < 24) {
    return 'urgent';
  }
  
  return 'safe';
}

export function getUrgencyColor(urgency: UrgencyLevel): string {
  const colors = {
    overdue: 'hsl(var(--overdue))',
    urgent: 'hsl(var(--urgent))',
    safe: 'hsl(var(--safe))',
  };
  return colors[urgency];
}

export function getTimeRemaining(dueDate: string): string {
  const date = parseISO(dueDate);
  const now = new Date();
  
  if (isPast(date)) {
    const minutesOverdue = Math.abs(differenceInMinutes(date, now));
    const hoursOverdue = Math.abs(differenceInHours(date, now));
    const daysOverdue = Math.floor(hoursOverdue / 24);
    
    if (daysOverdue > 0) {
      return `${daysOverdue}d overdue`;
    }
    if (hoursOverdue > 0) {
      return `${hoursOverdue}h overdue`;
    }
    return `${minutesOverdue}m overdue`;
  }
  
  const hours = differenceInHours(date, now);
  const minutes = differenceInMinutes(date, now) % 60;
  const seconds = differenceInSeconds(date, now) % 60;
  
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  
  return `${seconds}s`;
}

export function sortDeadlinesByUrgency(deadlines: Deadline[]): Deadline[] {
  const urgencyOrder = { overdue: 0, urgent: 1, safe: 2 };
  
  return [...deadlines].sort((a, b) => {
    // Completed items go to the bottom
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (b.status === 'completed' && a.status !== 'completed') return -1;
    
    // Sort by urgency
    const urgencyA = getUrgencyLevel(a.due_date);
    const urgencyB = getUrgencyLevel(b.due_date);
    
    if (urgencyOrder[urgencyA] !== urgencyOrder[urgencyB]) {
      return urgencyOrder[urgencyA] - urgencyOrder[urgencyB];
    }
    
    // If same urgency, sort by due date
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
}
