'use client';

import { UserStatus } from './types';

interface UserPresenceProps {
  users: UserStatus[];
}

export function UserPresence({ users }: UserPresenceProps) {
  const getStatusColor = (status: UserStatus['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-600';
      case 'idle':
        return 'text-yellow-600';
      case 'offline':
        return 'text-slate-400';
    }
  };

  const getStatusDot = (status: UserStatus['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-slate-300';
    }
  };

  const formatLastSeen = (lastSeen: number) => {
    const diffMinutes = Math.floor((Date.now() - lastSeen) / 1000 / 60);
    
    if (diffMinutes < 1) return 'active now';
    if (diffMinutes < 5) return 'idle';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return 'offline';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="text-sm font-semibold text-slate-600 mb-3">Team</h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.name}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${getStatusDot(user.status)} ${user.status === 'online' ? 'animate-pulse' : ''}`} />
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-slate-900">{user.name}</p>
              <p className={`text-xs ${getStatusColor(user.status)}`}>
                {formatLastSeen(user.lastSeen)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
