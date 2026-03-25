import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from('notifications').update({ read: true }).eq('id', id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      const unread = notifications.filter(n => !n.read);
      for (const n of unread) {
        await supabase.from('notifications').update({ read: true }).eq('id', n.id);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="animate-fade-in">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={() => markAllRead.mutate()}>
            <Check className="mr-2 h-4 w-4" />Mark All Read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-center text-muted-foreground py-12">Loading...</p>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl border p-4 transition-colors ${n.read ? 'bg-card' : 'bg-primary/5 border-primary/20'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground">{n.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!n.read && (
                  <Button variant="ghost" size="sm" onClick={() => markRead.mutate(n.id)}>
                    Mark read
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
