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
    };
    features: IFeatureCard[];
    contactEmail: string;
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
            imageUrl: { type: String, default: '/images2/about1.png' }
        },
        features: [FeatureCardSchema],
        contactEmail: { type: String, default: 'info@atlasfoundries.com' }
    },
    {
        timestamps: true,
    }
);

// We will use a SINGLE document for the entire site content
const SiteContent: Model<ISiteContent> = mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);

export default SiteContent;
