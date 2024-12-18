import React from 'react';
import { useTaskForm } from '../../hooks/tasks/useTaskForm';
import { TaskFormFields } from './form/TaskFormFields';
import { TaskFormError } from './form/TaskFormError';
import { TaskFormSubmitButton } from './form/TaskFormSubmitButton';

export function CreateTaskForm() {
  const {
    formData,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleFileChange,
  } = useTaskForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <TaskFormError message={errors.form} />
      )}

      <TaskFormFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onFileChange={handleFileChange}
      />

      <TaskFormSubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}