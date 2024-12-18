import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';
import { ChatMessage } from '../chat/ChatMessage';
import { CommandPalette } from '../chat/CommandPalette';
import { useCommandExecution } from '../../hooks/useCommandExecution';
import { CommandResult } from '../chat/CommandResult';

export function PersonalTasksChat() {
  const [message, setMessage] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const [commandResult, setCommandResult] = useState<any>(null);
  const { user } = useAuthStore();
  const { messages, sendMessage } = useChatStore();
  const { execute, error } = useCommandExecution();

  const taskMessages = messages.tasks || [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '/' && !showCommands && message === '') {
      e.preventDefault();
      setShowCommands(true);
      setMessage('/');
    }
  };

  const handleCommandSelect = async (command: string) => {
    setShowCommands(false);
    if (!user) return;

    try {
      const result = await execute(command);
      if (result) {
        setCommandResult(result);
      }
      setMessage('');
    } catch (error) {
      console.error('Error executing command:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    if (message.startsWith('/')) {
      await handleCommandSelect(message);
    } else {
      await sendMessage({
        channelId: 'tasks',
        content: message.trim(),
        userId: user.id,
        username: user.username,
        userRole: user.role,
        avatarUrl: user.avatarUrl,
      });
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-[#ececf1]">Task Discussion</h2>

      <div className="max-h-48 overflow-y-auto space-y-4">
        {taskMessages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet. Start a conversation!</p>
        ) : (
          taskMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </div>

      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-lg">
          {error}
        </div>
      )}

      {commandResult && (
        <CommandResult result={commandResult} onClose={() => setCommandResult(null)} />
      )}

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message or press / for commands..."
          className="w-full rounded-lg pr-12 py-3 pl-4 bg-[#40414f] border border-gray-600 text-[#ececf1] 
          placeholder-gray-400 focus:border-[#10a37f] focus:ring-[#10a37f] focus:ring-1 
          transition-colors duration-200"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 
          hover:text-[#10a37f] disabled:opacity-50 disabled:hover:text-gray-400 
          transition-colors duration-200"
        >
          <Send className="h-5 w-5" />
        </button>

        {showCommands && (
          <CommandPalette
            isOpen={showCommands}
            onSelect={handleCommandSelect}
            onClose={() => setShowCommands(false)}
            filter={message.slice(1)}
          />
        )}
      </form>
    </div>
  );
}