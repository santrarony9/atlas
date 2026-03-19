import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define the upload directory
        const uploadDir = join(process.cwd(), "public", "uploads");
        
        // Ensure the directory exists
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Generate a unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const path = join(uploadDir, filename);

        // Write the file
        await writeFile(path, buffer);

        // Return the public URL
        const url = `/uploads/${filename}`;
        
        return NextResponse.json({ url });
    } catch (error: any) {
        console.error("Error in upload API:", error);
        return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
    }
}
