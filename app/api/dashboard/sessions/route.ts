import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');

    const sessionsPath = join(process.env.HOME || '/home/olaf', '.openclaw/agents/main/sessions/sessions.json');
    
    const fileContent = await readFile(sessionsPath, 'utf-8');
    const sessionsData = JSON.parse(fileContent);

    // Find main session
    const mainSession = sessionsData.sessions?.find((s: any) => s.key === 'agent:main:main');

    if (!mainSession || !mainSession.transcript) {
      return NextResponse.json({ sessions: [] });
    }

    // Extract user messages and outcomes
    const sessions = [];
    const transcript = mainSession.transcript;

    for (let i = 0; i < transcript.length; i++) {
      const msg = transcript[i];
      
      if (msg.role === 'user') {
        const nextAssistant = transcript[i + 1];
        const user = msg.inbound?.from?.split(':')[1] || 'Unknown';
        const userId = msg.inbound?.from?.split(':')[1] || 'unknown';
        
        // Map user IDs to names
        const userName = userId === '8384321036' ? 'Olaf' : userId === '2002922580' ? 'Martin' : user;

        sessions.push({
          id: `${i}-${msg.timestamp || Date.now()}`,
          user: userName,
          message: typeof msg.content === 'string' ? msg.content.substring(0, 150) : 'Message',
          outcome: nextAssistant && typeof nextAssistant.content === 'string' 
            ? nextAssistant.content.substring(0, 100) 
            : null,
          timestamp: msg.timestamp || Date.now(),
        });
      }
    }

    // Sort by timestamp descending, limit
    const sortedSessions = sessions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    return NextResponse.json({ sessions: sortedSessions });

  } catch (error: any) {
    console.error('Sessions API error:', error);
    return NextResponse.json({ sessions: [] });
  }
}
