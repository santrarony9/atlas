import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
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
