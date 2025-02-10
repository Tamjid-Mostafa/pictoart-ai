import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary-config';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { message: 'Image is required' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const response = await cloudinary.uploader.upload(image, {
      folder: 'pictoart-ai', // Optional: specify folder in Cloudinary
    });

    return NextResponse.json({
      message: 'Image uploaded successfully',
      url: response.secure_url,
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { message: 'Failed to upload image' },
      { status: 500 }
    );
  }
}