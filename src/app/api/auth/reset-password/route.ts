import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        // Find user with valid token
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Reset Password Error:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
