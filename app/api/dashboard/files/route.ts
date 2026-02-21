import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');

    const workspacePath = process.env.HOME + '/.openclaw/workspace';

    // Get recent file changes from git
    const { stdout } = await execAsync(
      `cd ${workspacePath} && git log --pretty=format:"%H|%an|%at" --name-only --since="1 day ago" -n 50`,
      { maxBuffer: 1024 * 1024 }
    );

    const lines = stdout.trim().split('\n');
    const fileChanges: { [path: string]: { user: string; timestamp: number; count: number } } = {};

    let currentCommit: { hash: string; author: string; timestamp: number } | null = null;

    for (const line of lines) {
      if (line.includes('|')) {
        // Commit line: hash|author|timestamp
        const [hash, author, timestamp] = line.split('|');
        currentCommit = { hash, author, timestamp: parseInt(timestamp) * 1000 };
      } else if (line && currentCommit) {
        // File line
        const path = line.trim();
        if (path && !path.startsWith('.git')) {
          if (!fileChanges[path]) {
            fileChanges[path] = {
              user: currentCommit.author,
              timestamp: currentCommit.timestamp,
              count: 0,
            };
          }
          fileChanges[path].count++;
        }
      }
    }

    // Convert to array and check for conflicts (same file, different users, recent)
    const files = Object.entries(fileChanges).map(([path, data]) => {
      // Simple conflict detection: file changed multiple times
      const warning = data.count > 2;

      return {
        path,
        user: data.user,
        timestamp: data.timestamp,
        warning,
      };
    });

    // Sort by timestamp desc, limit
    const sortedFiles = files
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    return NextResponse.json({ files: sortedFiles });

  } catch (error: any) {
    console.error('Files API error:', error);
    return NextResponse.json({ files: [] });
  }
}
