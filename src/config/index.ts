export const CLOUDINARY_UPLOAD_PRESET =
  process.env.CLOUDINARY_UPLOAD_PRESET || "pic-app";

export const CLOUDINARY_API_KEY =
  process.env.CLOUDINARY_API_KEY || "545281651425943";

export const CLOUDINARY_API_SECRET =
  process.env.CLOUDINARY_API_SECRETcd || "M-5XFjQbXR0BoHuXSkZ59gggTx8";

export const CLOUDINARY_URL =
  process.env.CLOUDINARY_URL ||
  "cloudinary://545281651425943:M-5XFjQbXR0BoHuXSkZ59gggTx8@pic-app";

const port = "4000";
let ip: string = "192.168.0.17";

export const SERVER_URL = process.env.SERVER_URL || `http://${ip}:${port}`;

export const COMPREFACE_API_KEY =
  process.env.COMPREFACE_API_KEY || "5ee1d75d-de52-4fae-ba0a-252d0bf2c065";
