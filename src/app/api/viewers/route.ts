import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      return NextResponse.json({ error: "No session ID provided" }, { status: 400 });
    }

    // Connect to Vercel KV (Redis)
    const client = await createClient({
      url: process.env.KV_REDIS_URL
    })
    .on('error', err => console.error('Redis Client Error', err))
    .connect();

    const now = Date.now();
    // 5 minute expiration window
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    // 1. Add this user's heartbeat (score = timestamp) to the "live_viewers" sorted set
    await client.zAdd('live_viewers', [{ score: now, value: sessionId }]);

    // 2. Automatically delete anyone whose timestamp is older than 5 minutes
    await client.zRemRangeByScore('live_viewers', '-inf', fiveMinutesAgo);

    // 3. Count how many people are left in the set
    const activeCount = await client.zCard('live_viewers');

    // Close the connection gracefully (important for serverless functions)
    await client.quit();

    return NextResponse.json({ count: activeCount });
  } catch (error) {
    console.error("Live Viewers API Error:", error);
    return NextResponse.json({ error: "Failed to update viewers" }, { status: 500 });
  }
}
