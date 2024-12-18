import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ChatInterface } from '../chat/ChatInterface';
import { NewTaskModal } from '../tasks/NewTaskModal';
import { useAuthStore } from '../../store/authStore';
import { Menu } from 'lucide-react';
import { NotificationBadge } from '../notifications/NotificationBadge/NotificationBadge';
import { NotificationList } from '../notifications/NotificationList/NotificationList';
import type { ChatChannel } from '../../types/chat';

export function AppLayout() {
  const { signOut, user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const channelId = location.pathname.split('/')[1] || 'resources';

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-[#343541]">
      {/* Notification Badge - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <NotificationBadge onClick={() => setShowNotifications(!showNotifications)} />
        {showNotifications && (
          <NotificationList onClose={() => setShowNotifications(false)} />
        )}
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-[#202123] text-gray-400 hover:text-[#ececf1] transition-colors"
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out z-30 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar 
          onSignOut={signOut} 
          onNewTask={() => setShowNewTaskModal(true)}
        />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main 
        className={`flex-1 relative transition-all duration-300 ease-in-out overflow-hidden
        ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}
      >
        <ChatInterface channelId={channelId as ChatChannel} />
      </main>

      {/* New Task Modal */}
      <NewTaskModal 
        isOpen={showNewTaskModal} 
        onClose={() => setShowNewTaskModal(false)} 
      />
    </div>
  );
}