import { TImage } from "../@types/image";
import { CLOUDINARY_UPLOAD_PRESET } from "../constants/cloudinary";

export const getCloudinaryUrl = (action: "upload") =>
  `https://api.cloudinary.com/v1_1/pic-app/${action}`;

export const uploadToCloudinary = async (img: TImage) => {
  let base64Img = `data:image/jpg;base64,${img.base64}`;

  //Add your cloud name
  let apiUrl = getCloudinaryUrl("upload");

  let data = {
    file: base64Img,
    upload_preset: CLOUDINARY_UPLOAD_PRESET,
  };

  return await fetch(apiUrl, {
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
