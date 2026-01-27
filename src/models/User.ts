import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    role: 'admin' | 'user';
    resetToken?: string;
    resetTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        role: { type: String, default: 'user' },
        resetToken: { type: String },
        resetTokenExpiry: { type: Date },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
