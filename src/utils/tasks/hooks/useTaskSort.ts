import { useMemo } from 'react';
import type { Task } from '../../../types/task';

export function useTaskSort(tasks: Task[]) {
  return useMemo(() => {
    const sortByDueDate = (order: 'asc' | 'desc' = 'asc') => {
      return [...tasks].sort((a, b) => {
        const comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        return order === 'asc' ? comparison : -comparison;
      });
    };

    const sortByStatus = () => {
      const order = ['Not Started', 'In Progress', 'Completed'];
      return [...tasks].sort((a, b) => 
        order.indexOf(a.status) - order.indexOf(b.status)
      );
    };

    const sortByCreatedAt = (order: 'asc' | 'desc' = 'desc') => {
      return [...tasks].sort((a, b) => {
        const comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return order === 'asc' ? comparison : -comparison;
      });
    };

    return {
      sortByDueDate,
      sortByStatus,
      sortByCreatedAt,
    };
  }, [tasks]);
}