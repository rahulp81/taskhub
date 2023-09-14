import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import {redirect} from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskhub",
  description: "Organize and Track your task and enhance productivity",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col `}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}