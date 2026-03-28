import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { logger, logError } from "@/lib/logger"

export async function GET() {
    const startTime = Date.now()
    try {
        logger.debug("Fetching dashboard stats")

        // 1. Total Rides
        const [totalRows]: any = await db.query(`SELECT COUNT(*) as count FROM rides`)
        const totalRides = totalRows[0].count

        // 2. Active Rides (status based)
        const [activeRows]: any = await db.query(`
            SELECT COUNT(*) as count 
            FROM rides 
            WHERE status IN ('accepted', 'started', 'in_progress')
        `)
        const activeRides = activeRows[0].count

        // 3. Emergency & Monitoring (stage based on ACTIVE rides)
        const [stageRows]: any = await db.query(`
            SELECT 
                SUM(CASE WHEN sd.stage3 = 1 THEN 1 ELSE 0 END) as emergency_count,
                SUM(CASE WHEN (sd.stage1 = 1 OR sd.stage2 = 1) AND sd.stage3 = 0 THEN 1 ELSE 0 END) as monitoring_count
            FROM rides r
            JOIN stage_data sd ON r.rideid = sd.ride_id
            WHERE r.status IN ('accepted', 'started', 'in_progress')
        `)

        const emergencyCount = stageRows[0].emergency_count || 0
        const monitoringCount = stageRows[0].monitoring_count || 0

        const duration = Date.now() - startTime
        logger.info({ 
            duration, 
            totalRides, 
            activeRides, 
            emergencyCount 
        }, "Dashboard stats fetched successfully")

        return NextResponse.json({
            totalRides,
            activeRides,
            emergencyCount,
            monitoringCount
        })

    } catch (error) {
        logError(error, "Dashboard Stats API")
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }
}
