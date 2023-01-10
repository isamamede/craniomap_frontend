import { CanvasRenderingContext2D } from "react-native-canvas";

import { IProfilePredictions } from "../../@types/landmarks";
import { IServerProfilePredictions } from "../../@types/server";
import { drawPoint } from "./drawPoint";
import writeToCanvas from "./writeToCanvas";

export default function drawProfile(
  predictions: IServerProfilePredictions | IProfilePredictions,
  ctx: CanvasRenderingContext2D
) {
  Object.keys(predictions).forEach((key) => {
    const { x, y } = (predictions as any)[key];
    drawPoint(x, y, ctx);
    writeToCanvas(key, [x + 4, y + 3], ctx);
  });
}
