

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import { authOptions } from "../auth/[[...nextauth]]/route";

type Params = Promise<{req:Request}>

export async function POST(req: Request, segmentData: { params: Params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }

    const { comment: content, id: postId } = await req.json();

    if (!content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: session.user.id,
        postId: Number(postId),
      },
    });

    return NextResponse.json(
      {
        data: comment,
        message: "Comment Created successfully",
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
