import React from 'react';
import { Hash } from 'lucide-react';
import type { ChatChannel } from '../../../types/chat';

const channels: { id: ChatChannel; label: string }[] = [
  { id: 'resources', label: 'Resources' },
  { id: 'dev', label: 'Development' },
  { id: 'copywriting', label: 'Copywriting' },
  { id: 'media-buying', label: 'Media Buying' },
  { id: 'creatives', label: 'Creatives' },
  { id: 'sales', label: 'Sales' },
];

interface TaskChannelFieldProps {
  value: ChatChannel;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export function TaskChannelField({ value, onChange, error }: TaskChannelFieldProps) {
  return (
    <div>
      <label htmlFor="channel" className="block text-sm font-medium text-[#ececf1] mb-1.5">
        Channel <span className="text-red-400">*</span>
      </label>
      <div className="relative">
        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        <select
          id="channel"
          name="channel"
          required
          value={value}
          onChange={onChange}
          className="w-full pl-11 pr-10 py-2.5 rounded-lg bg-[#40414f] border border-gray-600 
          text-[#ececf1] shadow-sm transition-colors duration-200 appearance-none
          focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] focus:outline-none"
        >
          <option value="">Select a channel</option>
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id} className="bg-[#40414f]">
              {channel.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}