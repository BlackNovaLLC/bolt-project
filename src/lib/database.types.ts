export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          role: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          role: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          role?: string
          avatar_url?: string | null
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          name: string
          description: string | null
          status: 'Not Started' | 'In Progress' | 'Completed'
          assignee: string
          created_by: string
          due_date: string
          channel: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          status?: 'Not Started' | 'In Progress' | 'Completed'
          assignee: string
          created_by: string
          due_date: string
          channel: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          status?: 'Not Started' | 'In Progress' | 'Completed'
          assignee?: string
          due_date?: string
          channel?: string
          updated_at?: string
        }
      }
      task_comments: {
        Row: {
          id: string
          task_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          task_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          content?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          channel_id: string
          user_id: string
          content: string
          username: string
          user_role: string
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          channel_id: string
          user_id: string
          content: string
          username: string
          user_role: string
          avatar_url?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'task_assigned' | 'mention' | 'comment' | 'task_updated'
          content: string
          channel_id?: string
          task_id?: string
          read: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          type: 'task_assigned' | 'mention' | 'comment' | 'task_updated'
          content: string
          channel_id?: string
          task_id?: string
          read?: boolean
          created_at?: string
        }
        Update: {
          read?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}