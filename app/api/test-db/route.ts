import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [ping] = await db.query("SELECT 1 AS ok");
        const [tables] = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [process.env.DB_NAME]);

        return NextResponse.json({
            status: "connected",
            ping,
            tables,
        });
    } catch (error: any) {
        console.error("DB ERROR:", error);

        return NextResponse.json(
            {
                status: "error",
                message: error.message,
            },
            { status: 500 }
        );
    }
}


