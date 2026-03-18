import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const body = await request.json();
        const product = await Product.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error: any) {
        console.error('Error updating product:', error);
        return NextResponse.json({ 
            error: 'Failed to update product', 
            details: error.message || 'Unknown error' 
        }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
