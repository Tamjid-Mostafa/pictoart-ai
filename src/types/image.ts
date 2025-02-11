export interface GenerateImageParams {
    prompt: string;
    palette: string;
  }
  
  export interface GenerateImageResponse {
    photo: string;
    success: boolean;
    error?: string;
  }
  
  export interface DownloadImageOptions {
    fileName?: string;
    format?: 'png' | 'jpg';
  }