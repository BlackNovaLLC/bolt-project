import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../types/task';

interface EditTaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function EditTaskModal({ task, isOpen, onClose }: EditTaskModalProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    assignee: task.assignee,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateTask } = useTaskStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateTask(task.id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#343541] rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#343541] px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#ececf1]">Edit Task</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#ececf1] mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#40414f] border border-gray-700 rounded-lg 
              text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#ececf1] mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-[#40414f] border border-gray-700 rounded-lg 
              text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-[#ececf1] mb-1">
              Assignee
            </label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#40414f] border border-gray-700 rounded-lg 
              text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-[#ececf1] mb-1">
              Due Date
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#40414f] border border-gray-700 rounded-lg 
              text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-[#10a37f] hover:bg-[#0e906f] 
              rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}