import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log("Attempting to connect to DB...");
                    await dbConnect();
                    console.log("DB Connected. Searching for user:", credentials?.email);

                    const user = await User.findOne({ email: credentials?.email });
                    console.log("User found:", user ? "Yes" : "No");

                    if (user && bcrypt.compareSync(credentials!.password, user.password || "")) {
                        console.log("Password match. returning user.");
                        return { id: user._id.toString(), email: user.email, role: user.role };
                    }

                    console.log("Invalid credentials or user not found.");
                    return null; // Login failed
                } catch (error) {
                    console.error("Login Error:", error);
                    throw new Error("Internal Login Error");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
