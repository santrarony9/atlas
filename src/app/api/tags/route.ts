import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        await dbConnect();
        const tags = await Tag.find({}).sort({ name: 1 });
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        // Auto-generate slug if not provided/simple logic
        const slug = body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const tag = await Tag.create({ ...body, slug });
        return NextResponse.json(tag, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Tag already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
    }
}
