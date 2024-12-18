import React from 'react';
import { X } from 'lucide-react';
import { formatDate } from '../../utils/date/dateUtils';

interface CommandResultProps {
  result: {
    type: string;
    message: string;
    data?: any[];
  };
  onClose: () => void;
}

export function CommandResult({ result, onClose }: CommandResultProps) {
  const renderContent = () => {
    if (result.type === 'tasks') {
      return (
        <div className="space-y-2">
          {result.data?.map((task) => (
            <div key={task.id} className="p-3 rounded bg-[#2a2b32]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#ececf1]">{task.title}</span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${
                  task.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                  task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {task.status}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Assigned to @{task.assignee} • Due {formatDate(task.dueDate)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (result.type === 'success') {
      return (
        <div className="p-3 rounded bg-[#10a37f]/10 text-[#10a37f]">
          {result.message}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-[#40414f] rounded-lg border border-gray-600 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#ececf1] font-medium">{result.message}</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-[#ececf1] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {result.data?.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No results found</p>
      ) : (
        renderContent()
      )}
    </div>
  );
}