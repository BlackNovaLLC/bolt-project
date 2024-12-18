import { supabase } from '../../../config/supabase';
import type { Task } from '../../../types/task';
import { taskMapper } from '../mappers/taskMapper';
import type { RealtimeChannel } from '@supabase/supabase-js';

class TaskSubscriptionService {
  private channels: Map<string, RealtimeChannel> = new Map();

  subscribeToTasks(onUpdate: (task: Task) => void): () => void {
    const channelKey = 'tasks-subscription';
    
    // Clean up existing subscription if any
    this.unsubscribe(channelKey);

    const channel = supabase
      .channel(channelKey)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const task = taskMapper.mapTaskFromDB(payload.new);
            if (task) {
              console.log('Task update received:', task);
              onUpdate(task);
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('Task subscription status:', status);
      });

    this.channels.set(channelKey, channel);

    return () => this.unsubscribe(channelKey);
  }

  private unsubscribe(channelKey: string): void {
    const channel = this.channels.get(channelKey);
    if (channel) {
      console.log('Unsubscribing from task channel:', channelKey);
      supabase.removeChannel(channel);
      this.channels.delete(channelKey);
    }
  }
}

export const taskSubscriptionService = new TaskSubscriptionService();