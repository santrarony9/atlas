import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const article = await Article.findById(params.id);
        if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const article = await Article.findByIdAndUpdate(params.id, body, { new: true });
        if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
        return NextResponse.json(article);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update article" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const article = await Article.findByIdAndDelete(params.id);
        if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
        return NextResponse.json({ message: "Article deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
    }
}
