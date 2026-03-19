import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();
        const slug = params.slug;

        const article = await Article.findOne({ slug });

        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error: any) {
        console.error("Error fetching article by slug:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
