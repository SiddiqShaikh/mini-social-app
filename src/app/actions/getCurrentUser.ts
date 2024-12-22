import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prismadb";
import { authOptions } from "../api/auth/[[...nextauth]]/route";
// import { authOptions } from "@/lib/auth";



export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser) {
      return null;
    }
    const { hashPassword, ...user } = currentUser;

    return {
      ...user,
    };
  } catch (error: any) {
    return null;
  }
}
