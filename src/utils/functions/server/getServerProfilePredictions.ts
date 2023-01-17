import { IServerProfilePredictions } from "../../../@types/server";
import { COMPREFACE_API_KEY, COMPREFACE_URL } from "../../../config";
import { landmarksIfIndex, profileIndexArray } from "../../../constants/server";

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
        Object.entries(landmarksIfIndex).forEach((entry) => {
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

function getUrl(): string {
  let finalUrl = `${COMPREFACE_URL}/api/v1/detection/detect?`;

  Object.keys(options).forEach((key, i) => {
    finalUrl =
      finalUrl + `${key}=${(options as any)[key]}${i === 4 ? "" : "&"}`;
  });

  return finalUrl;
}

export default async function getServerProfilePredictions(file: string) {
  try {
    const response = await fetch(getUrl(), {
      method: "POST",
      body: JSON.stringify({
        file,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": COMPREFACE_API_KEY,
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
