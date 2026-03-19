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
            console.error("No file found in form data");
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log(`Uploading file: ${file.name}, size: ${file.size}, type: ${file.type}`);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define the upload directory
        // Use an absolute path relative to the project root
        const uploadDir = join(process.cwd(), "public", "uploads");
        
        // Ensure the directory exists
        try {
            if (!existsSync(uploadDir)) {
                console.log(`Creating directory: ${uploadDir}`);
                await mkdir(uploadDir, { recursive: true });
            }
        } catch (dirError: any) {
            console.error("Error creating upload directory:", dirError);
            return NextResponse.json({ error: "Failed to create upload directory", details: dirError.message }, { status: 500 });
        }

        // Generate a unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const path = join(uploadDir, filename);

        // Write the file
        try {
            console.log(`Writing file to: ${path}`);
            await writeFile(path, buffer);
        } catch (writeError: any) {
            console.error("Error writing file:", writeError);
            return NextResponse.json({ error: "Failed to write file to disk", details: writeError.message }, { status: 500 });
        }

        // Return the public URL
        const url = `/uploads/${filename}`;
        console.log(`Upload successful: ${url}`);
        
        return NextResponse.json({ url });
    } catch (error: any) {
        console.error("Unexpected error in upload API:", error);
        return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
    }
}
