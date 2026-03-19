import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SiteContent from '@/models/SiteContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: Publicly accessible content
export async function GET() {
    try {
        await dbConnect();
        let content = await SiteContent.findOne();

        if (content) {
            // Auto-fix for Vercel persistence: If DB has old/broken paths, update to new assets
            let updated = false;
            
            // Fix Hero
            if (content.hero.bgImage === '/images2/Cover.jpg' || content.hero.bgImage.includes('/uploads/')) {
                content.hero.bgImage = '/images2/Image 1.png';
                updated = true;
            }
            
            // Fix About (Homepage)
            if (content.about.imageUrl === '/images2/about1.png' || content.about.imageUrl.includes('/uploads/')) {
                content.about.imageUrl = '/images2/Step 2.png';
                updated = true;
            }
            
            // Fix Home CTA
            if (content.homeCTA.bgImage === '/images2/Cover.jpg' || content.homeCTA.bgImage.includes('/uploads/')) {
                content.homeCTA.bgImage = '/images2/Image 1.png';
                updated = true;
            }

            if (updated) {
                await SiteContent.updateOne({}, { 
                    $set: { 
                        'hero.bgImage': content.hero.bgImage,
                        'about.imageUrl': content.about.imageUrl,
                        'homeCTA.bgImage': content.homeCTA.bgImage
                    } 
                });
            }
        }

        return NextResponse.json(content || {
            // ... (rest of default content if needed)
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Protected update
export async function PUT(req: Request) {
    try {
        // Authenticate
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        // Update the SINGLE document, or create if missing
        // We use findOneAndUpdate with upsert: true
        const updatedContent = await SiteContent.findOneAndUpdate(
            {}, // match first document
            { $set: body },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json(updatedContent);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
