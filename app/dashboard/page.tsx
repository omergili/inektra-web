'use client';

import { useState, useEffect } from 'react';
import { LiveActivity } from '@/components/dashboard/LiveActivity';
import { ProjectGrid } from '@/components/dashboard/ProjectGrid';
import { SessionHistory } from '@/components/dashboard/SessionHistory';
import { FileActivity } from '@/components/dashboard/FileActivity';
import { UserPresence } from '@/components/dashboard/UserPresence';
import type { DashboardData } from '@/components/dashboard/types';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  const fetchDashboardData = async () => {
    try {
      // Parallel fetch all endpoints
      const [activityRes, sessionsRes, filesRes, projectsRes, presenceRes] = await Promise.all([
        fetch('/api/dashboard/activity'),
        fetch('/api/dashboard/sessions?limit=20'),
        fetch('/api/dashboard/files?limit=10'),
        fetch('/api/dashboard/projects'),
        fetch('/api/dashboard/presence'),
      ]);

      if (!activityRes.ok || !sessionsRes.ok || !filesRes.ok || !projectsRes.ok || !presenceRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [activity, sessions, files, projects, presence] = await Promise.all([
        activityRes.json(),
        sessionsRes.json(),
        filesRes.json(),
        projectsRes.json(),
        presenceRes.json(),
      ]);

      setData({
        activity,
        sessions: sessions.sessions || [],
        files: files.files || [],
        projects: projects.projects || [],
        presence: presence.users || [],
      });

      setError(null);
      setLastUpdate(Date.now());
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Polling every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = () => {
    const seconds = Math.floor((Date.now() - lastUpdate) / 1000);
    if (seconds < 10) return 'just now';
    return `${seconds}s ago`;
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-red-50 border border-red-200 rounded-xl">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-bold text-red-900 mb-2">Dashboard Error</h2>
          <p className="text-sm text-red-700 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchDashboardData();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">OpenClaw Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">
                Team collaboration · Updated {formatLastUpdate()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {error && (
                <div className="flex items-center gap-2 text-amber-700 text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Disconnected</span>
                </div>
              )}

              <button
                onClick={fetchDashboardData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50"
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{loading ? 'Updating...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {data && <UserPresence users={data.presence} />}
          </div>

          {/* Main Area */}
          <div className="lg:col-span-3 space-y-6">
            {data && (
              <>
                <LiveActivity activity={data.activity} />
                <ProjectGrid projects={data.projects} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SessionHistory sessions={data.sessions} />
                  <FileActivity files={data.files} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
