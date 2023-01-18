import * as FileSystem from "expo-file-system";
import { IFrontalPredictions } from "../../@types/landmarks";
import {
  frontalIndexArray,
  frontalIndexObj,
} from "../../constants/server/frontal";

/**
 * Parse server frontal predictions to the frontend use format
 * @param predictions - all predictions recivied from the ts server
 * @returns an object with the wanted predictions
 */
function parseFrontalPredictions(
  predictions: unknown[]
): IFrontalPredictions | null {
  let parsedValues: any = {};
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      if (
        prediction !== null &&
        typeof prediction === "object" &&
        "scaledMesh" in prediction
      ) {
        const keypoints = prediction.scaledMesh;
        for (let i = 0; i < (keypoints as any).length; i++) {
          const x = (keypoints as any)[i][0];
          const y = (keypoints as any)[i][1];

          if (frontalIndexArray.includes(i)) {
            Object.entries(frontalIndexObj).forEach((entry) => {
              const [key, value] = entry;
              if (value === i) {
                parsedValues[key] = { x, y };
              }
            });
          }
        }
      }
    });
  }
  return parsedValues;
}

/**
 * Call server and parse server frontal predictions to the frontend use format
 * @param node_url - Node server url
 * @param image_uri - Uploaded image uri
 * @returns an object with the wanted predictions
 */
export default async function getServerFrontal(
  node_url: string,
  image_uri: string
) {
  try {
    const response = await FileSystem.uploadAsync(
      `${node_url}/front`,
      image_uri,
      {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "image",
        httpMethod: "POST",
      }
    );
    const body: unknown = JSON.parse(response.body);
    if (body && typeof body === "object" && "predictions" in body) {
      const predictions = body.predictions;
      return parseFrontalPredictions(predictions as unknown[]);
    }
  } catch (error) {
    if (error && typeof error === "object" && "message" in error)
      throw error.message;
    throw error;
  }
}
