import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { authOptions } from "@/lib/auth";
// import { authOptions } from "../auth/[[...nextauth]]/route";
type Params = Promise<{ req: Request }>;
export async function POST(req: Request, res: Response,  segmentData: { params: Params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    const { title, description, imageUrl } = await req.json();
    if (!title || !description || !imageUrl) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content: description,
        image: imageUrl,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        data: post,
        message: "Post Created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(req: Request, res: Response,segmentData: { params: Params }) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        data: posts,
        message: "Post fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
