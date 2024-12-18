import React from 'react';

const AVAILABLE_COMMANDS = [
  {
    command: 'what are my to-do lists today.',
    description: 'View your tasks for today',
  },
  {
    command: 'what are @username\'s to-do lists today.',
    description: 'View another user\'s tasks',
  },
  {
    command: 'assign \'task description\' to @username.',
    description: 'Assign a new task to someone',
  },
  {
    command: 'list all completed tasks today.',
    description: 'View completed tasks',
  },
  {
    command: 'list all pending tasks today.',
    description: 'View pending tasks',
  },
  {
    command: 'list all mentions of me today.',
    description: 'View all mentions of you',
  },
  {
    command: 'show tasks created today',
    description: 'View all tasks created today',
  },
  {
    command: 'show tasks created yesterday',
    description: 'View all tasks created yesterday',
  },
  {
    command: 'show all in progress tasks',
    description: 'View all tasks currently in progress',
  },
  {
    command: 'show all tasks in this channel',
    description: 'View all tasks in the current channel',
  },
  {
    command: 'show all usernames',
    description: 'View all users in the system',
  },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onSelect: (command: string) => void;
  onClose: () => void;
  filter: string;
}

export function CommandPalette({ isOpen, onSelect, onClose, filter }: CommandPaletteProps) {
  if (!isOpen) return null;

  const filteredCommands = AVAILABLE_COMMANDS.filter(cmd =>
    cmd.command.toLowerCase().includes(filter.toLowerCase()) ||
    cmd.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#40414f] rounded-lg border border-gray-600 shadow-lg max-h-64 overflow-y-auto">
      {filteredCommands.map((cmd) => (
        <button
          key={cmd.command}
          onClick={() => {
            onSelect(cmd.command);
            onClose();
          }}
          className="w-full px-4 py-2 text-left hover:bg-[#2a2b32] flex items-start gap-3 group"
        >
          <span className="text-[#10a37f] font-mono text-sm">{cmd.command}</span>
          <span className="text-gray-400 text-sm group-hover:text-gray-300">
            {cmd.description}
          </span>
        </button>
      ))}
    </div>
  );
}