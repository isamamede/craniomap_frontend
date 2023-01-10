import { Buffer } from "buffer";
import { TImage } from "../@types/image";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_PRESET,
} from "../constants/cloudinary";
import getParamString from "../utils/functions/getParamString";

export const getCloudinaryUrl = (
  action:
    | "upload"
    | "image/destroy"
    | "resources/image/upload"
    | "/resources/image/tags"
) => `https://api.cloudinary.com/v1_1/pic-app/${action}`;

const Authorization = `Basic ${Buffer.from(
  CLOUDINARY_API_KEY + ":" + CLOUDINARY_API_SECRET
).toString("base64")}`;

/**
 * Upload an image to clpudinary
 * @param img  - Image file to be uploaded
 * @returns Uploaded image = {
 * url,
 * public_id,
 * signature
 * }
 */
export const uploadToCloudinary = async (img: TImage, tags?: string) => {
  let base64Img = `data:image/jpg;base64,${img.base64}`;

  let apiUrl = getCloudinaryUrl("upload");

  let data = {
    file: base64Img,
    upload_preset: CLOUDINARY_UPLOAD_PRESET,
    tags,
  };

  return await fetch(`${apiUrl}?${getParamString({ tags })}`, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  })
    .then(async (r) => {
      let data = await r.json();
      const uploadedImg = {
        url: data.secure_url,
        public_id: data.public_id,
        signature: data.signature,
      };
      return uploadedImg;
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * Delete an image stored in cloudinary
 * @param tag: image tags
 * @returns
 */
export const deleteCloudinaryImageByTag = async (tag: string = "") => {
  const apiUrl = getCloudinaryUrl("/resources/image/tags");

  return await fetch(`${apiUrl}/${tag}`, {
    headers: {
      Authorization,
    },
    method: "DELETE",
  })
    .then(async (r) => await r.json())
    .catch((err) => {
      throw err;
    });
};

/**
 * Delete all images stored in cloudinary
 * @returns
 */
export const deleteAllCloudinaryImages = async () => {
  const apiUrl = getCloudinaryUrl("resources/image/upload");

  const params: any = {
    api_key: CLOUDINARY_API_KEY,
    timestamp: new Date().getTime(),
    all: true,
  };

  const paramString = getParamString(params);
  return await fetch(`${apiUrl}?${paramString}`, {
    headers: {
      Authorization,
    },
    method: "DELETE",
  })
    .then(async (r) => {
      return await r.json();
    })
    .catch((err) => {
      throw err;
    });
};
