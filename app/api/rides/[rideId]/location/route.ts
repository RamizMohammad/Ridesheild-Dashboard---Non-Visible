import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ rideId: string }> }
) {
    try {
        const rideId = (await params).rideId
        const dbId = rideId.split('-')[1]

        if (!dbId || isNaN(parseInt(dbId))) {
            return NextResponse.json({ error: "Invalid Ride ID format" }, { status: 400 })
        }

        // Fetch driver location for the ride
        const [rows]: any = await db.query(`
            SELECT 
                d.current_lat,
                d.current_lon,
                d.updated_at
            FROM rides r
            JOIN drivers d ON r.driverid = d.driverid
            WHERE r.rideid = ?
        `, [dbId])

        if (rows.length === 0) {
            return NextResponse.json({ error: "Driver not found for this ride" }, { status: 404 })
        }

        const driver = rows[0]

        // Ensure we send valid numbers, or null if not set
        const location = {
            lat: driver.current_lat ? parseFloat(driver.current_lat) : null,
            lng: driver.current_lon ? parseFloat(driver.current_lon) : null,
            lastUpdated: driver.updated_at
        }

        return NextResponse.json(location)

    } catch (error) {
        console.error("Location API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
