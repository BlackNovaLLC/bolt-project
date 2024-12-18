import React from 'react';

interface TaskTitleFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function TaskTitleField({ value, onChange, error }: TaskTitleFieldProps) {
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-[#ececf1] mb-1.5">
        Task Title <span className="text-red-400">*</span>
      </label>
      <input
        type="text"
        id="title"
        name="title"
        required
        value={value}
        onChange={onChange}
        placeholder="Enter a descriptive title"
        className="w-full px-4 py-2.5 rounded-lg bg-[#40414f] border border-gray-600 
        text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors"
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}