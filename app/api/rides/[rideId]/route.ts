import { db } from "@/lib/db"
import { maskName } from "@/lib/mask"
import { NextResponse } from "next/server"
import { logger, logError } from "@/lib/logger"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ rideId: string }> }
) {
    const startTime = Date.now()
    try {
        const rideId = (await params).rideId
        logger.debug({ rideId }, "Fetching ride details")
        const dbId = rideId.split('-')[1]

        if (!dbId || isNaN(parseInt(dbId))) {
            return NextResponse.json({ error: "Invalid Ride ID format" }, { status: 400 })
        }

        // Fetch ride details
        const [rows]: any = await db.query(`
            SELECT 
                r.rideid,
                r.pickLoc,
                r.dropLoc,
                r.pickLat,
                r.pickLon,
                r.dropLat,
                r.dropLon,
                r.status,
                r.started_at,
                r.completed_at,
                
                sd.stage0,
                sd.stage1,
                sd.stage2,
                sd.stage3,

                u.name as user_name,
                u.mobile as user_mobile,
                
                d.name as driver_name,
                d.mobile as driver_mobile

            FROM rides r
            JOIN users u ON r.userid = u.id
            LEFT JOIN drivers d ON r.driverid = d.driverid
            LEFT JOIN stage_data sd ON r.rideid = sd.ride_id
            WHERE r.rideid = ?
        `, [dbId])

        if (rows.length === 0) {
            return NextResponse.json({ error: "Ride not found" }, { status: 404 })
        }

        const r = rows[0]

        // Determine stage
        let currentStage = 0;
        if (r.stage3) currentStage = 3;
        else if (r.stage2) currentStage = 2;
        else if (r.stage1) currentStage = 1;

        // Determine status string
        let status = "Normal"
        if (currentStage === 3) status = "Emergency"
        else if (currentStage >= 1) status = "Monitoring"

        const ride = {
            id: `RIDE-${r.rideid}`,
            userMasked: maskName(r.user_name),
            driverMasked: maskName(r.driver_name),
            userName: r.user_name,
            userEmail: `${r.user_mobile}@masked.local`,
            driverName: r.driver_name,
            driverEmail: `${r.driver_mobile}@masked.local`,

            stage: currentStage,
            location: r.pickLoc, // TODO: Use real current location if available
            lastEvent: "Monitoring Active", // Default
            status: status,
            timestamp: "Now",

            pickup: r.pickLoc,
            dropoff: r.dropLoc,
            pickupCoords: (r.pickLat && r.pickLon) ? { lat: parseFloat(r.pickLat), lng: parseFloat(r.pickLon) } : undefined,
            dropoffCoords: (r.dropLat && r.dropLon) ? { lat: parseFloat(r.dropLat), lng: parseFloat(r.dropLon) } : undefined,
            startTime: r.started_at ? new Date(r.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--",
            endTime: "--:--"
        }

        const duration = Date.now() - startTime
        logger.info({ rideId, duration, stage: currentStage }, "Ride details fetched successfully")

        return NextResponse.json(ride)

    } catch (error) {
        logError(error, "Ride Details API")
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
