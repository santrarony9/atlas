import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const category = await Category.findByIdAndDelete(params.id);
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
