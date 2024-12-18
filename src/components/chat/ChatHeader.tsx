import React from 'react';
import { Book, Code, Pen, Target, Palette, DollarSign, CheckSquare } from 'lucide-react';
import type { ChatChannel } from '../../types/chat';

const channelInfo: Record<ChatChannel, { icon: React.ElementType; label: string }> = {
  resources: { icon: Book, label: 'Resources Chat' },
  dev: { icon: Code, label: 'Development Chat' },
  copywriting: { icon: Pen, label: 'Copywriting Chat' },
  'media-buying': { icon: Target, label: 'Media Buying Chat' },
  creatives: { icon: Palette, label: 'Creatives Chat' },
  sales: { icon: DollarSign, label: 'Sales Chat' },
  tasks: { icon: CheckSquare, label: 'Task Chat' },
};

interface ChatHeaderProps {
  channelId: ChatChannel;
}

export function ChatHeader({ channelId }: ChatHeaderProps) {
  const channel = channelInfo[channelId];
  if (!channel) return null;

  const Icon = channel.icon;

  return (
    <div className="flex-shrink-0 h-16 bg-[#343541] border-b border-gray-700 flex items-center px-6 pl-16 lg:pl-6">
      <Icon className="h-5 w-5 text-gray-400" />
      <h1 className="ml-2 text-lg font-medium text-[#ececf1]">{channel.label}</h1>
    </div>
  );
}