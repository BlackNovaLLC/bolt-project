import React from 'react';
import { Search } from 'lucide-react';

interface TaskSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TaskSearchInput({ value, onChange, placeholder = 'Search tasks...' }: TaskSearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#40414f] border border-gray-600 
        text-[#ececf1] placeholder-gray-400 focus:border-[#10a37f] transition-colors"
      />
    </div>
  );
}