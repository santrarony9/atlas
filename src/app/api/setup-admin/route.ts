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

        let finalUser;
        if (existingUser) {
            existingUser.password = hashedPassword;
            existingUser.role = 'admin'; // ensure they are admin
            finalUser = await existingUser.save();
        } else {
            // Create
            finalUser = await User.create({
                email,
                password: hashedPassword,
                role: 'admin'
            });
        }

        // IMMEDIATE VERIFICATION
        const isMatch = await bcrypt.compare(password, finalUser.password);

        return NextResponse.json({
            status: 'Success',
            message: 'Admin User Updated',
            debug: {
                userEmail: finalUser.email,
                userRole: finalUser.role,
                passwordReset: true,
                verificationTest: isMatch ? "PASSED (Password matches hash)" : "FAILED (Hash mismatch!)"
            },
            action: 'Go to /login'
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
