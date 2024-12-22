import { prisma } from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
