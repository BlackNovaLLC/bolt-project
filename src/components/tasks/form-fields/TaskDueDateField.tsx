import React from 'react';
import { Calendar } from 'lucide-react';

interface TaskDueDateFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function TaskDueDateField({ value, onChange, error }: TaskDueDateFieldProps) {
  return (
    <div>
      <label htmlFor="dueDate" className="block text-sm font-medium text-[#ececf1] mb-1.5">
        Due Date <span className="text-red-400">*</span>
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="datetime-local"
          id="dueDate"
          name="dueDate"
          required
          value={value}
          onChange={onChange}
          min={new Date().toISOString().slice(0, 16)}
          className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#40414f] border border-gray-600 
          text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}