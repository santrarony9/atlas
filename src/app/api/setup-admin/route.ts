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
        // Check if exists
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            existingUser.password = hashedPassword;
            existingUser.role = 'admin'; // ensure they are admin
            await existingUser.save();

            return NextResponse.json({
                message: 'Admin user exists - PASSWORD RESET SUCCESSFUL!',
                action: 'Go to /login and use admin@atlas.com / admin123',
                note: 'Your password has been reset to admin123'
            });
        }

        // Create
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
