import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signedToken } from "@/lib/auth"


export async function POST(req: Request) {
    const { email, password } = await req.json();

    const [rows]: any = await db.query(
        "SELECT id, email, name, role, password FROM web_users WHERE email = ?",
        [email]
    )

    if (rows.length === 0) {
        return NextResponse.json({
            message: "User not found"
        }, { status: 401 })
    }

    const user = rows[0];
    // TODO (SECURITY): Replace password check with bcrypt
    if (user.password !== password) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signedToken({
        id: user.id,
        email: user.email,
        role: user.role,
    });

    return NextResponse.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
    });
}
