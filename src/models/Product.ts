import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    category?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        imageUrl: { type: String, required: false }, // Store Base64 or URL
        description: { type: String, required: true },
        category: { type: String, required: false },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model during hot reloads
const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
