import cloudinary from "./cloudinary-config";

interface CloudinaryUploadResult {
    secure_url: string;
  }
  

export async function uploadToCloudinary(
    buffer: Buffer,
    fileType: "pdf" | "image",
    folder: string,
    documentID: string
  ): Promise<CloudinaryUploadResult> {
    if (!buffer || !folder) {
      throw new Error("Missing file buffer or folder name");
    }
  console.log({buffer, fileType, folder, documentID});
    try {
      // Set up options for PDF files
      let uploadOptions: any = {
        folder: 'pictoart-ai'
      };
  
      if (fileType === "pdf") {
        uploadOptions = {
          ...uploadOptions,
          resource_type: "raw",
          public_id: `${documentID}.pdf`, // Include .pdf extension in the public_id
          format: "pdf",
          type: "upload",
        };
      } else {
        uploadOptions.resource_type = "image";
      }
  
      // Upload to Cloudinary using buffer directly
      const uploadResponse = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(uploadOptions, (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResult);
            })
            .end(buffer);
        }
      );
  
      // Ensure the URL has .pdf extension if it's a PDF file
      if (fileType === "pdf" && !uploadResponse.secure_url.endsWith(".pdf")) {
        uploadResponse.secure_url = `${uploadResponse.secure_url}.pdf`;
      }
  
      return uploadResponse;
    } catch (error) {
      console.log(error);
      console.error("Cloudinary Upload Error:", error);
      throw new Error("Failed to upload file");
    }
  }