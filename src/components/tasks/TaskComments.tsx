import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useCommentStore } from '../../store/commentStore';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/date/dateUtils';

interface TaskCommentsProps {
  taskId: string;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthStore();
  const { comments, createComment, error } = useCommentStore();
  const taskComments = comments[taskId] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      await createComment({
        taskId,
        content: newComment.trim(),
      });
      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-lg">
          {error}
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-3">
        {taskComments.length === 0 ? (
          <p className="text-sm text-gray-400">No comments yet</p>
        ) : (
          taskComments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              {comment.avatarUrl ? (
                <img
                  src={comment.avatarUrl}
                  alt={comment.username}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <div className="h-6 w-6 rounded-full bg-[#10a37f] flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {comment.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#ececf1]">
                    @{comment.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-0.5">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment input */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded-lg pr-12 py-2 pl-4 bg-[#2a2b32] border border-gray-600 text-[#ececf1] 
          placeholder-gray-400 focus:border-[#10a37f] focus:ring-[#10a37f] focus:ring-1 
          transition-colors duration-200 text-sm"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 
          hover:text-[#10a37f] disabled:opacity-50 disabled:hover:text-gray-400 
          transition-colors duration-200"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}