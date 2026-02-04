import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { maskName } from "@/lib/mask";

// Type definition for DB row (simplified)
interface RideRow {
    rideid: number;
    user_name: string;
    user_mobile: string;
    driver_name: string;
    driver_mobile: string;
    status: string;
    started_at: Date;
    completed_at: Date;
    pickLoc: string;
    dropLoc: string;
    // We can infer stage/alerts based on flags if they exist in DB, 
    // or random/default for now if DB doesn't track historical stages explicitly.
}

export async function GET() {
    try {
        // Fetch completed rides
        // Assuming 'completed' status. Adjust as needed.
        const [rows]: any = await db.query(`
            SELECT 
                r.rideid,
                r.pickLoc,
                r.dropLoc,
                r.status,
                r.started_at,
                r.completed_at,
                
                u.name as user_name,
                u.mobile as user_mobile,
                
                d.name as driver_name,
                d.mobile as driver_mobile
                
            FROM rides r
            JOIN users u ON r.userid = u.id
            LEFT JOIN drivers d ON r.driverid = d.driverid
            WHERE r.status NOT IN ('accepted', 'started', 'in_progress')
            ORDER BY r.completed_at DESC
            LIMIT 50
        `);

        const historyRides = rows.map((r: RideRow & { cur_stage: number }) => {
            const startTime = new Date(r.started_at);
            const endTime = new Date(r.completed_at);
            const durationMs = endTime.getTime() - startTime.getTime();
            const durationMinutes = Math.floor(durationMs / 60000);

            return {
                id: `RIDE-${r.rideid}`,
                userMasked: maskName(r.user_name),
                driverMasked: maskName(r.driver_name),

                // Detailed info (for authorized views)
                userName: r.user_name,
                userEmail: `${r.user_mobile}@masked.local`,
                driverName: r.driver_name,
                driverEmail: `${r.driver_mobile}@masked.local`,

                stage: r.cur_stage || 0,
                status: r.status, // Pass raw status to frontend
                duration: `${durationMinutes}m`,
                alertSent: false, // Default

                completedAt: endTime.toLocaleDateString() + ' ' + endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                location: r.dropLoc, // Use drop location as "final" location
                startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),

                timeline: [
                    { stage: 0, time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), label: "Ride Started", description: `Started at ${r.pickLoc}` },
                    { stage: 0, time: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), label: "Ride Completed", description: `Arrived at ${r.dropLoc}` }
                ],
                logs: ["Ride completed successfully"]
            };
        });

        return NextResponse.json(historyRides);
    } catch (error) {
        console.error("HISTORY API ERROR:", error);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}
