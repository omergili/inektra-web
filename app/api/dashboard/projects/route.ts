import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    const workspacePath = process.env.HOME + '/.openclaw/workspace';

    // Read workspace directory
    const entries = await readdir(workspacePath, { withFileTypes: true });
    
    const projects = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('.')) continue;
      if (entry.name === 'node_modules') continue;
      if (entry.name === 'memory') continue;
      if (entry.name === 'features') continue;
      if (entry.name === '__pycache__') continue;
      if (entry.name.includes('venv')) continue;
      if (entry.name === 'scripts') continue;

      const projectPath = join(workspacePath, entry.name);

      try {
        // Check if it's a git repo
        const { stdout: gitCheck } = await execAsync(`cd ${projectPath} && git rev-parse --is-inside-work-tree 2>/dev/null || echo "false"`);
        
        if (gitCheck.trim() === 'false') continue;

        // Get last commit info
        const { stdout: lastCommit } = await execAsync(
          `cd ${projectPath} && git log -1 --pretty=format:"%an|%at" 2>/dev/null || echo "Unknown|0"`
        );

        const [author, timestamp] = lastCommit.split('|');

        // Check if deployed (has vercel.json or .vercel)
        let status: 'deployed' | 'local' = 'local';
        let url: string | undefined;

        try {
          await stat(join(projectPath, '.vercel'));
          status = 'deployed';
          
          // Try to get Vercel URL
          if (entry.name === 'inektra-web') {
            url = 'https://inektra-web.vercel.app';
          }
        } catch {
          // Not deployed
        }

        projects.push({
          name: entry.name,
          status,
          lastDeploy: status === 'deployed' ? parseInt(timestamp) * 1000 : null,
          owner: author !== 'Unknown' ? author : null,
          url,
        });

      } catch (error) {
        // Skip projects that error
        continue;
      }
    }

    return NextResponse.json({ projects });

  } catch (error: any) {
    console.error('Projects API error:', error);
    return NextResponse.json({ projects: [] });
  }
}
