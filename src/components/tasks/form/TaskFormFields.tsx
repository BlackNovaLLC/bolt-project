import { type ChangeEvent } from 'react';
import { TaskTitleField } from '../form-fields/TaskTitleField';
import { TaskDescriptionField } from '../form-fields/TaskDescriptionField';
import { TaskAssigneeField } from '../form-fields/TaskAssigneeField';
import { TaskDueDateField } from '../form-fields/TaskDueDateField';
import { TaskChannelField } from '../form-fields/TaskChannelField';
import type { TaskFormData, TaskFormErrors } from '../../../types/forms';

interface TaskFormFieldsProps {
  formData: TaskFormData;
  errors: TaskFormErrors;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFileChange: (files: File[]) => void;
}

export function TaskFormFields({
  formData,
  errors,
  onChange,
  onFileChange,
}: TaskFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        <TaskTitleField
          value={formData.title}
          onChange={onChange}
          error={errors.title}
        />

        <TaskDescriptionField
          value={formData.description}
          onChange={onChange}
        />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <TaskAssigneeField
          value={formData.assignee}
          onChange={onChange}
          error={errors.assignee}
        />

        <TaskDueDateField
          value={formData.dueDate}
          onChange={onChange}
          error={errors.dueDate}
        />

        <TaskChannelField
          value={formData.channel}
          onChange={onChange}
          error={errors.channel}
        />
      </div>
    </div>
  );
}