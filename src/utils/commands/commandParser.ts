import type { ParsedCommand } from '../../types/commands';

export function parseCommand(input: string): ParsedCommand | null {
  // Convert to lowercase for easier matching
  const text = input.toLowerCase();

  // Check for viewing todos
  if (text === 'what are my to-do lists today.') {
    return { type: 'VIEW_TODOS' };
  }

  // Check for viewing other user's todos
  const userTodosMatch = text.match(/what are @(\w+)'s to-do lists today\./);
  if (userTodosMatch) {
    return {
      type: 'VIEW_USER_TODOS',
      targetUser: userTodosMatch[1],
    };
  }

  // Check for task assignment
  const assignMatch = text.match(/assign '(.+)' to @(\w+)\./);
  if (assignMatch) {
    return {
      type: 'ASSIGN_TASK',
      task: assignMatch[1],
      targetUser: assignMatch[2],
    };
  }

  // Check for completed tasks
  if (text === 'list all completed tasks today.') {
    return { type: 'LIST_COMPLETED' };
  }

  // Check for pending tasks
  if (text === 'list all pending tasks today.') {
    return { type: 'LIST_PENDING' };
  }

  return null;
}