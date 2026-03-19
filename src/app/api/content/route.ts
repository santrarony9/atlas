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

        // If content doesn't exist yet (first time load), return default structure
        if (!content) {
            return NextResponse.json({
                hero: {
                    title: "Engineered Casting Solutions",
                    subtitle: "100+ Years of Excellence",
                    bgImage: "/images2/Cover.jpg"
                },
                about: {
                    title: "About Atlas Foundries",
                    heading: "World-Class Manufacturing in the Heart of India",
                    description: "Atlas Foundries is a pioneering force in the metal casting industry. We combine traditional craftsmanship with modern Lost Foam technology to produce complex, high-precision components that traditional sand casting cannot achieve.",
                    imageUrl: "/images2/about1.png"
                },
                features: [
                    { title: "Railway", description: "Couplers, draft gears, and bogie components engineered for durability.", imageUrl: "/images2/2.jpg", linkUrl: "/products" },
                    { title: "Marine", description: "Corrosion-resistant castings for ship building and offshore platforms.", imageUrl: "/images2/3.jpg", linkUrl: "/products" },
                    { title: "Industrial", description: "Valves, pumps, and heavy machinery parts made with Lost Foam precision.", imageUrl: "/images2/73.png", linkUrl: "/lost-foam-manufacturing" }
                ],
                subscription: {
                    domainName: "atlasfoundries.com",
                    domainRenewalDate: "28th May 2026",
                    hostName: "Dreamline Cloud",
                    hostRenewalDate: "28th May 2026",
                },
                footer: {
                    officeAddress: "225/2 CIT Road, Scheme VII M, Kolkata - 700054, India",
                    worksAddress: "Works: Howrah - 711410",
                    contactPhone: "+91 98307 35480",
                    contactEmail: "enquiry@atlasfoundries.com",
                    copyrightText: "Atlas Foundries. All Rights Reserved."
                }
            });
        }

        return NextResponse.json(content);
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
