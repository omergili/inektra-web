import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const sessionsPath = join(process.env.HOME || '/home/olaf', '.openclaw/agents/main/sessions/sessions.json');
    
    const fileContent = await readFile(sessionsPath, 'utf-8');
    const sessionsData = JSON.parse(fileContent);

    // Find main session
    const mainSession = sessionsData.sessions?.find((s: any) => s.key === 'agent:main:main');

    if (!mainSession || !mainSession.transcript) {
      return NextResponse.json({ users: [] });
    }

    // Track last activity per user
    const userActivity: { [userId: string]: { name: string; lastSeen: number } } = {};

    for (const msg of mainSession.transcript) {
      if (msg.role === 'user' && msg.inbound?.from) {
        const userId = msg.inbound.from.split(':')[1];
        const userName = userId === '8384321036' ? 'Olaf' : userId === '2002922580' ? 'Martin' : userId;
        const timestamp = msg.timestamp || Date.now();

        if (!userActivity[userId] || timestamp > userActivity[userId].lastSeen) {
          userActivity[userId] = {
            name: userName,
            lastSeen: timestamp,
          };
        }
      }
    }

    // Convert to array and determine status
    const users = Object.values(userActivity).map(user => {
      const minutesSinceActivity = (Date.now() - user.lastSeen) / 1000 / 60;
      
      let status: 'online' | 'idle' | 'offline';
      if (minutesSinceActivity < 5) {
        status = 'online';
      } else if (minutesSinceActivity < 60) {
        status = 'idle';
      } else {
        status = 'offline';
      }

      return {
        name: user.name,
        status,
        lastSeen: user.lastSeen,
      };
    });

    return NextResponse.json({ users });

  } catch (error: any) {
    console.error('Presence API error:', error);
    return NextResponse.json({ users: [] });
  }
}
