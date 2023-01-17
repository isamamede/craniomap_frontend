export const CLOUDINARY_UPLOAD_PRESET =
  process.env.CLOUDINARY_UPLOAD_PRESET || "pic-app";

export const CLOUDINARY_API_KEY =
  process.env.CLOUDINARY_API_KEY || "545281651425943";

export const CLOUDINARY_API_SECRET =
  process.env.CLOUDINARY_API_SECRETcd || "M-5XFjQbXR0BoHuXSkZ59gggTx8";

export const CLOUDINARY_URL =
  process.env.CLOUDINARY_URL ||
  "cloudinary://545281651425943:M-5XFjQbXR0BoHuXSkZ59gggTx8@pic-app";

const ip: string = "192.168.0.17";

export const SERVER_URL = process.env.SERVER_URL || `http://${ip}:4000`;

export const COMPREFACE_URL = `http://${ip}:8000`;

export const COMPREFACE_API_KEY =
  process.env.COMPREFACE_API_KEY || "f8938c56-8fe3-49f1-9abf-2d54a966c903";
