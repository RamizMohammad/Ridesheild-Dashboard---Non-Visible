import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { maskName } from "@/lib/mask";

export async function GET() {
    try {
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

        sd.stage0,
        sd.stage1,
        sd.stage2,
        sd.stage3,

        u.name   AS user_name,
        u.mobile AS user_mobile,

        d.name   AS driver_name,
        d.mobile AS driver_mobile,
        d.current_lat,
        d.current_lon

      FROM rides r
      JOIN users u ON r.userid = u.id
      LEFT JOIN drivers d ON r.driverid = d.driverid
      LEFT JOIN stage_data sd ON r.rideid = sd.ride_id
      WHERE r.status IN ('accepted', 'started', 'in_progress')
      ORDER BY r.started_at DESC
    `);

        const activeRides = rows.map((r: any) => {
            // Determine stage from flags
            let currentStage = 0;
            if (r.stage3) currentStage = 3;
            else if (r.stage2) currentStage = 2;
            else if (r.stage1) currentStage = 1;

            // console.log(r);

            return {
                id: `RIDE-${r.rideid}`,

                // Privacy
                userMasked: maskName(r.user_name),
                driverMasked: maskName(r.driver_name),

                // Admin-only (frontend controls visibility)
                userName: r.user_name,
                userEmail: `${r.user_mobile}@masked.local`, // TODO (DM)
                driverName: r.driver_name,
                driverEmail: `${r.driver_mobile}@masked.local`, // TODO (DM)

                // Escalation
                stage: currentStage,
                status: r.status,

                // Location
                location: r.pickLoc,
                coordinates: {
                    lat: r.current_lat ?? r.pickLat,
                    lng: r.current_lon ?? r.pickLon,
                },

                // Timeline
                startTime: r.started_at,

                pickup: r.pickLoc,
                dropoff: r.dropLoc,
            };
        });

        return NextResponse.json(activeRides);
    } catch (err: any) {
        console.error("ACTIVE RIDES ERROR:", err);

        return NextResponse.json(
            { error: "Failed to fetch active rides" },
            { status: 500 }
        );
    }
}
