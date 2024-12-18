import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';
import type { ChatChannel } from '../types/chat';
import { AppError } from '../utils/error';

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
    dueDate: '',
    channel: 'resources',
    files: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createTask } = useTaskStore();
  const { user } = useAuthStore();

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.assignee.trim()) {
      newErrors.assignee = 'Assignee is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const dueDate = new Date(formData.dueDate);
      const now = new Date();
      if (dueDate < now) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (!formData.channel) {
      newErrors.channel = 'Channel is required';
    }

    if (formData.files.length > 10) {
      newErrors.files = 'Maximum 10 files allowed';
    }

    const totalSize = formData.files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 50 * 1024 * 1024) { // 50MB total limit
      newErrors.files = 'Total file size exceeds 50MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrors({ form: 'You must be logged in to create tasks' });
      return;
    }

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
        dueDate: '',
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