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

        const historyRides = rows.map((r: any) => {
            const reqTime = r.requested_at ? new Date(r.requested_at) : new Date();
            const startTime = r.started_at ? new Date(r.started_at) : null;
            const endTime = r.completed_at ? new Date(r.completed_at) : null;
            
            let duration = "N/A";
            if (startTime && endTime && !isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
                const durationMs = endTime.getTime() - startTime.getTime();
                const durationMinutes = Math.floor(durationMs / 60000);
                duration = `${durationMinutes}m`;
            }

            const formatTime = (date: Date | null) => {
                if (!date || isNaN(date.getTime())) return "--:--";
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            const formatDate = (date: Date | null) => {
                if (!date || isNaN(date.getTime())) return "--/--/----";
                return date.toLocaleDateString();
            };

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
                duration,

                completedAt: endTime ? `${formatDate(endTime)} ${formatTime(endTime)}` : `${formatDate(reqTime)} ${formatTime(reqTime)}`,
                location: r.dropLoc, 
                startTime: formatTime(startTime || reqTime),
                endTime: formatTime(endTime || reqTime),

                timeline: [
                    { stage: 0, time: formatTime(startTime), label: "Ride Started", description: `Started at ${r.pickLoc}` },
                    { stage: 0, time: formatTime(endTime), label: "Ride Completed", description: `Arrived at ${r.dropLoc}` }
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

