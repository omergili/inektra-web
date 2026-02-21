'use client';

import { useState } from 'react';
import { Session } from './types';

interface SessionHistoryProps {
  sessions: Session[];
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'olaf' | 'martin'>('all');

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.user.toLowerCase() === filter;
  });

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleString('de-DE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
        
        <div className="flex gap-2">
          {(['all', 'olaf', 'martin'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption
                  ? 'bg-accent-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filterOption === 'all' ? 'All' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredSessions.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="border-l-4 border-accent-200 bg-slate-50 rounded-r-lg p-3 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900">{session.user}</span>
                    <span className="text-xs text-slate-500">{formatTime(session.timestamp)}</span>
                  </div>
                  <p className="text-sm text-slate-700 truncate" title={session.message}>
                    {session.message}
                  </p>
                  {session.outcome && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="text-green-600">✅</span>
                      <span className="text-slate-600">{session.outcome}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <p className="font-medium">No activity yet</p>
          <p className="text-sm mt-1">
            {filter !== 'all' ? `No activity from ${filter}` : 'Recent chats will appear here'}
          </p>
        </div>
      )}
    </div>
  );
}
