import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
            role: "admin",
        });

        return NextResponse.json({ message: "Admin created", user });
    } catch (error) {
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }
}
