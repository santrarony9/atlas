import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        const mongoURI = process.env.MONGODB_URI;
        const nextAuthSecret = process.env.NEXTAUTH_SECRET;

        // Check Env Vars
        if (!mongoURI) {
            return NextResponse.json({ status: 'Error', message: 'MONGODB_URI is missing' }, { status: 500 });
        }
        if (!nextAuthSecret) {
            return NextResponse.json({ status: 'Error', message: 'NEXTAUTH_SECRET is missing' }, { status: 500 });
        }

        // Test DB Connection
        await dbConnect();

        // Test DB Query
        const userCount = await User.countDocuments();

        return NextResponse.json({
            status: 'Success',
            message: 'Connected to Database',
            userCount,
            envCheck: {
                mongoURI: 'Present',
                nextAuthSecret: 'Present'
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'Error',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
