import { CanvasRenderingContext2D } from "react-native-canvas";

import { IProfilePredictions } from "../../@types/landmarks";
import { IServerProfilePredictions } from "../../@types/server";
import { drawPoint } from "./drawPoint";

export default function drawProfile(
  predictions: IServerProfilePredictions | IProfilePredictions,
  ctx: CanvasRenderingContext2D
) {
  Object.values(predictions).forEach((value) => {
    const { x, y } = value;
    drawPoint(x, y, ctx);
  });
}
