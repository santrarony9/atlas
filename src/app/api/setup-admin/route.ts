import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await dbConnect();

        const email = 'admin@atlas.com';
        const password = 'admin123';

        // Check if exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                message: 'Admin user already exists!',
                action: 'Go to /login and use admin@atlas.com / admin123'
            });
        }

        // Create
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            password: hashedPassword,
            role: 'admin'
        });

        return NextResponse.json({
            message: 'SUCCESS! Admin Created.',
            credentials: { email, password },
            action: 'Go to /login now!'
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
