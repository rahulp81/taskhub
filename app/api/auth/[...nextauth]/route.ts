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
    async session({ session }) {
      if (
        typeof session.user !== "undefined" &&
        !isEqual(cacheUser, session.user)
      ) {
        try {
          await dbConnect();
          const existingUser = await User.findOne({
            email: session.user.email,
          });
          if (!existingUser) {
            const user = await User.create({
              email: session.user.email,
              name: session.user.name,
              image: session.user.image,
            });
          } else {
            const updatedUserData = {
              name: session.user.name,
              image: session.user.image,
            };
            const u = await User.findOneAndUpdate(
              { email: session.user.email },
              updatedUserData
            );
          }
          cacheUser = session.user;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("same session no DB");
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
