import { db } from "@/lib/db";
import { NextResponse } from 'next/server';
import { logger } from "@/lib/logger";

export async function GET() {
    try {
        // Simple query to verify DB connection
        await db.query("SELECT 1");
        
        logger.info("Health check ping OK");
        
        return NextResponse.json({ 
            status: 'ok', 
            database: 'connected',
            timestamp: new Date().toISOString() 
        });
    } catch (error) {
        logger.error({ err: error }, "Health check failed");
        return NextResponse.json({ 
            status: 'error', 
            database: 'disconnected',
            timestamp: new Date().toISOString() 
        }, { status: 503 });
    }
}
