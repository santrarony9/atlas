import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        await dbConnect();
        const articles = await Article.find({}).sort({ createdAt: -1 });
        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        
        // Basic slug generation if not provided
        if (!body.slug && body.title) {
            body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const article = await Article.create(body);
        return NextResponse.json(article, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: error.message || "Failed to create article" }, { status: 500 });
    }
}
