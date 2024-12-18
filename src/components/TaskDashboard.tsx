import React from 'react';
import { MessageSquare, Bell } from 'lucide-react';
import { TaskList } from './tasks/TaskList';
import { CreateTaskForm } from './tasks/CreateTaskForm';
import { ChatInterface } from './chat/ChatInterface';
import { NotificationBadge } from './notifications/NotificationBadge';
import { NotificationList } from './notifications/NotificationList';

export function TaskDashboard() {
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#343541]">
      <header className="bg-[#202123] p-4 border-b border-gray-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-[#10a37f]" />
            <h1 className="text-xl font-semibold text-[#ececf1]">Task Manager</h1>
          </div>
          <div className="relative">
            <NotificationBadge onClick={() => setShowNotifications(!showNotifications)} />
            {showNotifications && (
              <NotificationList onClose={() => setShowNotifications(false)} />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium text-[#ececf1] mb-4">Tasks</h2>
            <div className="space-y-6">
              <CreateTaskForm />
              <TaskList />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium text-[#ececf1] mb-4">Chat</h2>
            <div className="bg-[#40414f] rounded-lg border border-gray-700 h-[600px]">
              <ChatInterface channelId="tasks" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}