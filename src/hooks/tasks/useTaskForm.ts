import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAuthStore } from '../../store/authStore';
import type { ChatChannel } from '../../types/chat';
import { AppError } from '../../utils/error';
import { taskValidationService } from '../../utils/tasks/services/taskValidationService';

interface TaskFormData {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  channel: ChatChannel;
  files: File[];
}

interface ValidationErrors {
  title?: string;
  assignee?: string;
  dueDate?: string;
  channel?: string;
  files?: string;
  form?: string;
}

export function useTaskForm() {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    assignee: '',
    dueDate: new Date().toISOString().slice(0, 16), // Set default to current date/time
    channel: 'resources',
    files: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createTask } = useTaskStore();
  const { user } = useAuthStore();

  const validateForm = (): boolean => {
    if (!user) {
      setErrors({ form: 'You must be logged in to create tasks' });
      return false;
    }

    const validation = taskValidationService.validateTask(formData);
    if (!validation.success) {
      setErrors(validation.errors || {});
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        assignee: formData.assignee.trim(),
        dueDate: formData.dueDate,
        channel: formData.channel,
      });

      // Reset form on success
      setFormData({
        title: '',
        description: '',
        assignee: '',
        dueDate: new Date().toISOString().slice(0, 16),
        channel: 'resources',
        files: [],
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to create task:', error);
      setErrors({
        form: error instanceof AppError ? error.message : 'Failed to create task'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
    if (errors.files) {
      setErrors(prev => ({ ...prev, files: undefined }));
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleFileChange,
  };
}