import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFeatureCard {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
}

export interface ISiteContent extends Document {
    hero: {
        title: string;
        subtitle: string;
        bgImage: string;
    };
    about: {
        title: string;
        heading: string;
        description: string;
        imageUrl: string;
        bulletPoints: string[];
    };
    features: IFeatureCard[];
    contactEmail: string;
    socialLinks: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
        youtube: string;
    };
    companyProfileUrl: string;
    faviconUrl: string;
    homeCTA: {
        title: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
        bgImage: string;
    };
    aboutPage: {
        missionTitle: string;
        missionText: string;
        visionTitle: string;
        visionText: string;
    };
    processPage: {
        steps: { title: string; description: string; imageUrl: string }[];
    };
    infrastructure: {
        videoUrl: string;
        companyImages: string[];
        certificates: string[];
    };
    subscription: {
        domainName: string;
        domainRenewalDate: string;
        hostName: string;
        hostRenewalDate: string;
    };
    footer: {
        officeAddress: string;
        worksAddress: string;
        contactPhone: string;
        contactEmail: string;
        copyrightText: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const FeatureCardSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, default: '/products' }
});

const SiteContentSchema: Schema = new Schema(
    {
        hero: {
            title: { type: String, default: 'Engineered Casting Solutions' },
            subtitle: { type: String, default: '100+ Years of Excellence' },
            bgImage: { type: String, default: '/images2/Cover.jpg' }
        },
        about: {
            title: { type: String, default: 'About Atlas Foundries' },
            heading: { type: String, default: 'World-Class Manufacturing in the Heart of India' },
            description: { type: String, default: 'Atlas Foundries is a pioneering force in the metal casting industry...' },
            imageUrl: { type: String, default: '/images2/about1.png' },
            bulletPoints: [{ type: String, default: ['ISO 9001:2015 Certified', 'Specialized in Complex Geometries', 'Exporting to 15+ Countries'] }]
        },
        features: [FeatureCardSchema],
        contactEmail: { type: String, default: 'info@atlasfoundries.com' },
        socialLinks: {
            facebook: { type: String, default: "" },
            twitter: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            instagram: { type: String, default: "" },
            youtube: { type: String, default: "" },
        },
        companyProfileUrl: { type: String, default: "" },
        faviconUrl: { type: String, default: "/favicon.svg" },
        homeCTA: {
            title: { type: String, default: 'Ready to upgrade your supply chain?' },
            subtitle: { type: String, default: 'Contact us today to discuss your casting requirements and experience the Atlas advantage.' },
            buttonText: { type: String, default: 'Contact Us Now' },
            buttonLink: { type: String, default: '/contact-us' },
            bgImage: { type: String, default: '/images2/Cover.jpg' }
        },
        aboutPage: {
            missionTitle: { type: String, default: 'Our Mission' },
            missionText: { type: String, default: '"To bring a change in the engineered castings market through better technology, improved quality, lower costs, and reduced impact on the environment by adoption of green technologies."' },
            visionTitle: { type: String, default: 'Our Vision' },
            visionText: { type: String, default: '"To be a pioneer in the casting industry by sustainably and profitably establishing latest production methodologies through continuous research, development, and adoption of best practices."' }
        },
        processPage: {
            steps: [{
                title: { type: String },
                description: { type: String },
                imageUrl: { type: String }
            }]
        },
        infrastructure: {
            videoUrl: { type: String, default: "" },
            companyImages: [{ type: String }],
            certificates: [{ type: String }],
        },
        subscription: {
            domainName: { type: String, default: "atlasfoundries.com" },
            domainRenewalDate: { type: String, default: "28th May 2026" },
            hostName: { type: String, default: "Dreamline Cloud" },
            hostRenewalDate: { type: String, default: "28th May 2026" },
        },
        footer: {
            officeAddress: { type: String, default: "225/2 CIT Road, Scheme VII M, Kolkata - 700054, India" },
            worksAddress: { type: String, default: "Works: Howrah - 711410" },
            contactPhone: { type: String, default: "+91 98307 35480" },
            contactEmail: { type: String, default: "enquiry@atlasfoundries.com" },
            copyrightText: { type: String, default: "Atlas Foundries. All Rights Reserved." }
        }
    },
    {
        timestamps: true,
    }
);

// We will use a SINGLE document for the entire site content
const SiteContent: Model<ISiteContent> = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);

export default SiteContent;
