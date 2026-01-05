export const env = {
  API_URL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",

  APP_NAME:
    process.env.NEXT_PUBLIC_APP_NAME || "Clothes_Web_V",

  MAX_FILE_SIZE: 50 * 1024 * 1024 // 50MB
};
