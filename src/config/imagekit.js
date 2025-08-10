import ImageKit from "imagekit";

// ImageKit configuration for client-side
export const imageKitConfig = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
};

// ImageKit configuration for server-side (for authentication endpoint)
export const imageKitServerConfig = {
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
};

// Initialize ImageKit for server-side operations (only if we have private key)
// This should only be used in server-side code (API routes)
let imageKit = null;
if (typeof window === 'undefined' && process.env.IMAGEKIT_PRIVATE_KEY) {
  imageKit = new ImageKit(imageKitServerConfig);
}

export { imageKit };
