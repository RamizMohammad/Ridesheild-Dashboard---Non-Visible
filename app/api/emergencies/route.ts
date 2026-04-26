import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [rows]: any = await db.query(`
            SELECT 
                r.rideid,
                r.pickLoc,
                r.dropLoc,
                r.status,
                r.requested_at,
                
                u.name as user_name,
                d.name as driver_name,
                
                sd.stage1,
                sd.stage2,
                sd.stage3
            FROM rides r
            JOIN stage_data sd ON r.rideid = sd.ride_id
            LEFT JOIN users u ON r.userid = u.id
            LEFT JOIN drivers d ON r.driverid = d.driverid
            WHERE sd.stage1 = 1 OR sd.stage2 = 1 OR sd.stage3 = 1
            ORDER BY r.requested_at DESC
        `);

        const incidents = rows.map((r: any) => {
            let type = "SOS Triggered";
            let severity = "critical";
            let status = "Active";

            if (r.stage3 === 1) {
                type = "SOS Triggered";
                severity = "critical";
            } else if (r.stage2 === 1) {
                type = "Video Anomaly";
                severity = "high";
            } else if (r.stage1 === 1) {
                type = "Audio Threshold";
                severity = "medium";
            }

            if (r.status === "completed" || r.status === "cancelled") {
                status = "Resolved";
            } else {
                status = "Active";
            }

            const reqTime = new Date(r.requested_at);
            const timeStr = reqTime.toLocaleDateString() + ' ' + reqTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return {
                id: `INC-${r.rideid}`,
                type,
                location: r.pickLoc,
                time: timeStr,
                status,
                severity,
                driver: r.driver_name || "Unknown Driver",
                user: r.user_name || "Unknown User",
            };
        });

        return NextResponse.json(incidents);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
