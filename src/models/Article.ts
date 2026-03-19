import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    slug: string;
    description: string;
    content: string;
    imageUrl: string;
    author: string;
    tags: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        content: { type: String, required: true },
        imageUrl: { type: String, default: "" },
        author: { type: String, default: "Atlas Admin" },
        tags: [{ type: String }],
        isPublished: { type: Boolean, default: true }
    },
    {
        timestamps: true,
    }
);

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
