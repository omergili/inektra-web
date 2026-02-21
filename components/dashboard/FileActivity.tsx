'use client';

import { FileChange } from './types';

interface FileActivityProps {
  files: FileChange[];
}

export function FileActivity({ files }: FileActivityProps) {
  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diffMinutes = Math.floor((now - timestamp) / 1000 / 60);
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' });
  };

  const getFileIcon = (path: string) => {
    if (path.endsWith('.tsx') || path.endsWith('.ts')) return '⚛️';
    if (path.endsWith('.json')) return '📋';
    if (path.endsWith('.md')) return '📝';
    if (path.endsWith('.css')) return '🎨';
    return '📄';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">File Activity</h2>

      {files.length > 0 ? (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.path}-${index}`}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                file.warning
                  ? 'bg-amber-50 border border-amber-200'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-2xl">{getFileIcon(file.path)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate" title={file.path}>
                    {file.path}
                  </p>
                  <p className="text-xs text-slate-500">
                    by <span className="font-medium">{file.user}</span> · {formatTime(file.timestamp)}
                  </p>
                </div>
              </div>

              {file.warning && (
                <div className="flex items-center gap-2 text-amber-700 text-xs font-medium whitespace-nowrap">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Conflict</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="font-medium">No recent file changes</p>
          <p className="text-sm mt-1">File activity will appear here</p>
        </div>
      )}
    </div>
  );
}
