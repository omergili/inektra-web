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

    if (!mainSession || !mainSession.transcript || mainSession.transcript.length === 0) {
      return NextResponse.json({
        active: false,
        task: null,
        user: null,
        since: null,
      });
    }

    // Get last message
    const lastMessage = mainSession.transcript[mainSession.transcript.length - 1];
    const lastUserMessage = mainSession.transcript
      .slice()
      .reverse()
      .find((msg: any) => msg.role === 'user');

    // Check if agent is currently working (last message is assistant and recent)
    const isRecent = Date.now() - mainSession.lastReplyAt < 300000; // 5 minutes
    const isAssistantWorking = lastMessage.role === 'assistant';

    return NextResponse.json({
      active: isRecent && isAssistantWorking,
      task: isAssistantWorking && isRecent ? lastMessage.content.substring(0, 100) : null,
      user: lastUserMessage?.inbound?.from?.split(':')[1] || 'Unknown',
      since: isRecent ? mainSession.lastReplyAt : null,
    });

  } catch (error: any) {
    console.error('Activity API error:', error);
    return NextResponse.json({
      active: false,
      task: null,
      user: null,
      since: null,
    });
  }
}
