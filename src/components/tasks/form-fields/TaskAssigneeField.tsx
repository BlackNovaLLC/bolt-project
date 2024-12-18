import React, { useState, useEffect } from 'react';
import { AtSign, Loader2, AlertCircle } from 'lucide-react';
import { useUserSearch } from '../../../hooks/users/useUserSearch';
import type { UserProfile } from '../../../types/auth';

interface TaskAssigneeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function TaskAssigneeField({ value, onChange, error }: TaskAssigneeFieldProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { users, isLoading, error: searchError, searchUsers, clearSearch } = useUserSearch();

  useEffect(() => {
    if (value.trim()) {
      searchUsers(value);
    } else {
      clearSearch();
    }
  }, [value, searchUsers, clearSearch]);

  const handleUserSelect = (user: UserProfile) => {
    onChange({
      target: {
        name: 'assignee',
        value: user.username
      }
    } as React.ChangeEvent<HTMLInputElement>);
    setShowSuggestions(false);
  };

  return (
    <div>
      <label htmlFor="assignee" className="block text-sm font-medium text-[#ececf1] mb-1.5">
        Assignee <span className="text-red-400">*</span>
      </label>
      <div className="relative">
        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          id="assignee"
          name="assignee"
          required
          value={value}
          onChange={onChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Type to search users"
          className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#40414f] border border-gray-600 
          text-[#ececf1] placeholder-gray-400 shadow-sm transition-colors duration-200
          focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] focus:outline-none"
        />
        
        {showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-[#40414f] rounded-lg border border-gray-600 shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center px-4 py-3 text-gray-400">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching users...
              </div>
            ) : searchError ? (
              <div className="px-4 py-3 text-red-400 text-sm">
                <AlertCircle className="inline-block w-4 h-4 mr-2" />
                {searchError}
              </div>
            ) : users.length > 0 ? (
              users.map(user => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleUserSelect(user)}
                  className="w-full px-4 py-2 text-left hover:bg-[#2a2b32] transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.username}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#10a37f] flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="text-[#ececf1]">@{user.username}</span>
                    </div>
                    <span className="text-sm text-gray-400">{user.role}</span>
                  </div>
                </button>
              ))
            ) : value.trim() ? (
              <div className="px-4 py-3 text-sm text-gray-400">
                No users found matching "{value}"
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400">
                Type to search users
              </div>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}