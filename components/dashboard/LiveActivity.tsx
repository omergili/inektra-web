'use client';

import { AgentActivity } from './types';

interface LiveActivityProps {
  activity: AgentActivity;
}

export function LiveActivity({ activity }: LiveActivityProps) {
  const formatDuration = (since: number | null) => {
    if (!since) return '';
    const minutes = Math.floor((Date.now() - since) / 1000 / 60);
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} min ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">Live Activity</h2>
        <div className={`flex items-center gap-2 ${activity.active ? 'text-accent-600' : 'text-slate-400'}`}>
          <div className={`w-3 h-3 rounded-full ${activity.active ? 'bg-accent-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className="text-sm font-medium">
            {activity.active ? 'Active' : 'Idle'}
          </span>
        </div>
      </div>

      {activity.active && activity.task ? (
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="bg-accent-100 text-accent-800 px-3 py-1 rounded-lg text-sm font-medium">
              {activity.user || 'Unknown'}
            </div>
            <div className="flex-1">
              <p className="text-slate-700 font-medium">{activity.task}</p>
              {activity.since && (
                <p className="text-sm text-slate-500 mt-1">
                  Started {formatDuration(activity.since)}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500">
          <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="font-medium">Agent is idle</p>
          <p className="text-sm mt-1">No active tasks running</p>
        </div>
      )}
    </div>
  );
}
