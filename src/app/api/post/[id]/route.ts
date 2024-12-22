import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";
type Params = Promise<{ req: Request }>;

export async function GET(
  req: Request,
  res: Response,
  segmentData: { params: Params }
) {
  const id = req.url.split("/");

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id[id.length - 1]) },
      include: {
        author: { select: { name: true } },
        comments: {
          include: {
            author: { select: { name: true } },
          },
          orderBy: {
            createdAt: "desc", // Sort by latest
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        data: post,
        message: "Post fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
