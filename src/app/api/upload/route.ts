import formidable from "formidable";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";


interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json({ message: "No Image Found" }, { status: 400 });
    }
    //bytes
    const bytes = await file.arrayBuffer();
    //buffer
    const buffer = Buffer.from(bytes);
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "next-cloudinary-uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );

    return NextResponse.json(
      {
        data: { publicId: result?.public_id, imageUrl: result?.secure_url },
        message: "Image Upload successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {

    return NextResponse.json(
      { message: "Upload image failed" },
      { status: 500 }
    );
  }
}
