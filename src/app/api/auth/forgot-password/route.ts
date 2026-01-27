import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            // Retrieve fake delay to prevent timing attacks, or just return 200 to not leak existence
            return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });
        }

        // Generate Token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        // Save hashed token to DB (optional: hash it, but for simplicity here we store raw or hashed. Storing raw for now as per plan, or hash if desired. Let's store raw for MVP simplicity or hash it if we want to be secure. Given the "Log to console" requirement, we'll store it directly to verify).
        // Actually, best practice is to store hash. Let's stick to simple storage for this MVP as requested.

        user.resetToken = resetToken;
        user.resetTokenExpiry = new Date(resetTokenExpiry);
        await user.save();

        // Send Email (Mock)
        const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/login/reset?token=${resetToken}`;
        console.log('------------------------------------------');
        console.log('PASSWORD RESET LINK (Dev Mode):');
        console.log(resetUrl);
        console.log('------------------------------------------');

        return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });

    } catch (error) {
        console.error('Forgot Password Error:', error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
