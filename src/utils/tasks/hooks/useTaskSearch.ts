import { useState, useCallback } from 'react';
import type { Task } from '../../../types/task';

export function useTaskSearch(tasks: Task[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchTasks = useCallback((term: string) => {
    if (!Array.isArray(tasks)) return [];
    if (!term.trim()) return tasks;

    const searchLower = term.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchLower) ||
      task.description?.toLowerCase().includes(searchLower) ||
      task.assignee.toLowerCase().includes(searchLower)
    );
  }, [tasks]);

  return {
    searchTerm,
    setSearchTerm,
    searchTasks,
    filteredTasks: searchTasks(searchTerm),
  };
}