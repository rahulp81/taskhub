import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/users.model";
import bcrypt from "bcrypt";
import { isEqual } from "lodash";

let cacheUser = {};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          if (!email || !password) {
            console.log("null");
            return null;
          }
          await dbConnect();
          const user = await User.findOne({ email: email });
          if (!user) throw Error("email/password mismatch!");
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            throw Error("email/password mismatch!");
          }
          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      try {
        await dbConnect();
        const email = user.email || profile?.email;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          // If user doesn't exist, create a new one
          const newUser = new User({
            email,
            name: user.name,
            image: user.image,
          });
          await newUser.save();
        } else {
          // If user exists, update their image (and other fields if needed)
          console.log(existingUser);
          existingUser.name = user.name;
          existingUser.image = user.image;
          await existingUser.save();
        }
      } catch (error) {
        console.log(error);
      }
      return true; // Return true to allow the sign-in to proceed
    }
  },
  session: {
    strategy: "jwt",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
