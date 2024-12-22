import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already Exist" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashPassword: hashedPassword,
      },
    });

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      message: "User registered successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { messsage: "Error creating user" },
      { status: 500 }
    );
  }
}
