import * as FileSystem from "expo-file-system";
import { TImage } from "../@types/image";

/**
 * Upload an image to clpudinary
 * @param img  - Image file to be uploaded
 * @returns Uploaded image = {
 * url,
 * public_id,
 * signature
 * }
 */
export const uploadLocally = async (img: TImage, tags?: string) => {
  const img_path = `${FileSystem.documentDirectory}/${tags}_${Date.now()}`;

  return await FileSystem.copyAsync({
    from: img.uri,
    to: img_path,
  })
    .then(async (r) => {
      return img_path;
    })
    .catch((err) => {
      throw err;
    });
};
