import React from 'react';

interface TaskDescriptionFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TaskDescriptionField({ value, onChange }: TaskDescriptionFieldProps) {
  return (
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-[#ececf1] mb-1.5">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        rows={4}
        placeholder="Provide additional details about the task"
        className="w-full px-4 py-2.5 rounded-lg bg-[#40414f] border border-gray-600 
        text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors resize-none"
      />
    </div>
  );
}