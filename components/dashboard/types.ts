// Dashboard TypeScript Interfaces

export interface AgentActivity {
  active: boolean;
  task: string | null;
  user: string | null;
  since: number | null;
}

export interface Session {
  id: string;
  user: string;
  message: string;
  outcome: string | null;
  timestamp: number;
}

export interface FileChange {
  path: string;
  user: string;
  timestamp: number;
  warning: boolean; // Both users editing same file
}

export interface Project {
  name: string;
  status: 'deployed' | 'local' | 'unknown';
  lastDeploy: number | null;
  owner: string | null;
  url?: string;
}

export interface UserStatus {
  name: string;
  status: 'online' | 'idle' | 'offline';
  lastSeen: number;
}

export interface DashboardData {
  activity: AgentActivity;
  sessions: Session[];
  files: FileChange[];
  projects: Project[];
  presence: UserStatus[];
}
