import { IServerProfilePredictions } from "../../@types/server";
import {
  profileIndexArray,
  profileIndexObj,
} from "../../constants/server/profile";

type TOptions = {
  limit: number;
  det_prob_threshold: number;
  prediction_count: number;
  face_plugins: string;
  status: boolean;
};

const options: TOptions = {
  limit: 1,
  det_prob_threshold: 0.8,
  prediction_count: 1,
  face_plugins: "landmarks,landmarks2d106",
  status: true,
};

function parseProfilePredictions(
  predictions: [number, number][]
): IServerProfilePredictions | null {
  let parsedValues: any = {};
  if (predictions.length > 0) {
    predictions.forEach((prediction, i) => {
      const [x, y] = prediction;
      if (profileIndexArray.includes(i)) {
        Object.entries(profileIndexObj).forEach((entry) => {
          const [key, value] = entry;
          if (Array.isArray(value)) {
            if (value.includes(i)) {
              parsedValues[key] = { x, y };
            }
          } else if (value === i) {
            parsedValues[key] = { x, y };
          }
        });
      }
    });
  }
  return parsedValues;
}

function getUrl(compreface_url: string): string {
  let finalUrl = `${compreface_url}/api/v1/detection/detect?`;

  Object.keys(options).forEach((key, i) => {
    finalUrl =
      finalUrl + `${key}=${(options as any)[key]}${i === 4 ? "" : "&"}`;
  });

  return finalUrl;
}

/**
 * Call server and parse server profile predictions to the frontend use format
 * @param compreface_url - Compreface server url
 * @param image_uri - Uploaded image uri
 * @param api_key - Compreface api_key
 * @returns an object with the wanted predictions
 */
export default async function getServerProfile(
  compreface_url: string,
  file: string,
  api_key: string
) {
  try {
    const response = await fetch(getUrl(compreface_url), {
      method: "POST",
      body: JSON.stringify({
        file,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": api_key,
      },
    });
    const body = await response.json();
    const landmarks = body.result[0].landmarks;
    const parsedLandmarks = parseProfilePredictions(landmarks);
    return parsedLandmarks;
  } catch (err) {
    throw err;
  }
}
