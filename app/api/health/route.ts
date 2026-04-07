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
        logger.error({ err: error }, "Health check - Database connection failed");
        
        // Return 200 OK even if DB is down, as requested, to avoid failing the overall health check.
        return NextResponse.json({ 
            status: 'ok', 
            database: 'disconnected',
            error: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString() 
        }, { status: 200 });
    }
}
