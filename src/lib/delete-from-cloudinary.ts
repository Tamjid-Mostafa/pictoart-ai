"use server";

import cloudinary from "./cloudinary-config";

export async function deleteImageFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      throw new Error("Failed to delete image from Cloudinary");
    }
    return { success: true };
  } catch (error:any) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }
}
