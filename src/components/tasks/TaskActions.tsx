import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../types/task';

interface TaskActionsProps {
  task: Task;
  onEdit?: () => void;
}

export function TaskActions({ task, onEdit }: TaskActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { deleteTask } = useTaskStore();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
      setShowMenu(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 text-gray-400 hover:text-[#ececf1] rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-1 w-36 bg-[#40414f] rounded-lg shadow-lg border border-gray-700 py-1 z-10">
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-[#2a2b32] hover:text-[#ececf1] flex items-center"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Task
            </button>
          )}
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-red-400/10 flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
}