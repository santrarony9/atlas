import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        await dbConnect();
        const categories = await Category.find({}).sort({ name: 1 });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Auto-generate slug if not provided
        if (!body.slug && body.name) {
            body.slug = body.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const category = await Category.create(body);
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
