// app/api/auth/me/route.ts
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const auth = req.headers.get("authorization");
    if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const token = auth.replace("Bearer ", "");
        const decoded: any = verifyToken(token);

        const [rows]: any = await db.query(
            "SELECT id, email, name, role FROM web_users WHERE id = ?",
            [decoded.id]
        );

        return NextResponse.json(rows[0]);
    } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}

