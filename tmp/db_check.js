const mongoose = require('mongoose');

// Define Schema inside check script to avoid import issues
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    role: { type: String, default: 'user' }
});

const SiteContentSchema = new mongoose.Schema({
    subscription: {
        domainName: String,
        domainRenewalDate: String,
        hostName: String,
        hostRenewalDate: String,
    }
});

async function check() {
    try {
        // Use the connection string from env if available, or a default local one
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/atlas'; 
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);

        const admin = await User.findOne({ email: 'santrarony9@gmail.com' });
        console.log('Super Admin User:', admin ? { email: admin.email, role: admin.role } : 'Not found');

        const content = await SiteContent.findOne();
        console.log('Site Content Subscription:', content ? content.subscription : 'Not found');

        process.exit(0);
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}

check();
