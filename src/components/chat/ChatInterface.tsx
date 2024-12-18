import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { PersonalTasksView } from '../tasks/PersonalTasksView';
import { ChannelTasksView } from './ChannelTasksView';
import { ActivityBoard } from '../tasks/ActivityBoard';
import type { ChatChannel } from '../../types/chat';

interface ChatInterfaceProps {
  channelId: ChatChannel;
}

export function ChatInterface({ channelId }: ChatInterfaceProps) {
  // Show activity board for the special "activity" channel
  if (channelId === 'activity') {
    return (
      <div className="h-full bg-[#343541]">
        <ActivityBoard />
      </div>
    );
  }

  // Show personal tasks view for the special "tasks" channel
  if (channelId === 'tasks') {
    return (
      <div className="h-full bg-[#343541]">
        <PersonalTasksView />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#343541]">
      <ChatHeader channelId={channelId} />
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Chat Column */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-gray-700">
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
              <ChatMessages channelId={channelId} />
            </div>
            <div className="border-t border-gray-700 bg-[#343541] px-4 md:px-6 py-4">
              <ChatInput channelId={channelId} />
            </div>
          </div>

          {/* Tasks Column */}
          <div className="w-96 flex-shrink-0 overflow-y-auto px-4 py-4 bg-[#2a2b32]">
            <ChannelTasksView channelId={channelId} />
          </div>
        </div>
      </div>
    </div>
  );
}