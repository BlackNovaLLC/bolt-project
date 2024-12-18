import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Book, Code, Pen, Target, Palette, DollarSign, 
  PlusCircle, LogOut, MessageSquare, LayoutGrid, CheckSquare
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthStore } from '../../store/authStore';
import type { ChatChannel } from '../../types/chat';

const channels = [
  { id: 'activity', icon: LayoutGrid, label: 'Activity Board' },
  { id: 'tasks', icon: CheckSquare, label: 'Personal Tasks' },
  { id: 'resources', icon: Book, label: 'Resources Chat' },
  { id: 'dev', icon: Code, label: 'Development Chat' },
  { id: 'copywriting', icon: Pen, label: 'Copywriting Chat' },
  { id: 'media-buying', icon: Target, label: 'Media Buying Chat' },
  { id: 'creatives', icon: Palette, label: 'Creatives Chat' },
  { id: 'sales', icon: DollarSign, label: 'Sales Chat' },
] as const;

interface SidebarProps {
  onSignOut: () => void;
  onNewTask: () => void;
}

export function Sidebar({ onSignOut, onNewTask }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  
  const currentChannel = location.pathname.split('/')[1] || 'resources';

  return (
    <div className="h-full flex flex-col bg-[#202123] text-[#ececf1] shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-[#10a37f]" />
          <span className="font-semibold">Task Manager</span>
        </div>
      </div>

      {/* New Task Button */}
      <button
        onClick={onNewTask}
        className="mx-4 mt-4 flex items-center justify-center px-4 py-2 border border-transparent 
        rounded-lg text-sm font-medium text-white bg-[#10a37f] hover:bg-[#0e906f] 
        transition-colors duration-200"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        New Task
      </button>

      {/* Channels */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isActive = channel.id === currentChannel;

          return (
            <button
              key={channel.id}
              onClick={() => navigate(`/${channel.id}`)}
              className={clsx(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200',
                isActive 
                  ? 'bg-[#343541] text-[#ececf1]' 
                  : 'text-gray-400 hover:bg-[#2a2b32] hover:text-[#ececf1]'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{channel.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      {user && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-[#10a37f] flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">@{user.username}</span>
                <span className="text-xs text-gray-400">{user.role}</span>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="p-2 text-gray-400 hover:text-[#ececf1] rounded-lg hover:bg-[#2a2b32] 
              transition-colors duration-200"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}