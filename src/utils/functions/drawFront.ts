import { CanvasRenderingContext2D } from "react-native-canvas";

import { IFrontalPredictions } from "../../@types/landmarks";
import { drawPoint } from "./drawPoint";

// Drawing Mesh
export default function drawFront(
  predictions: IFrontalPredictions,
  ctx: CanvasRenderingContext2D
) {
  Object.values(predictions).forEach((value) => {
    const { x, y } = value;
    drawPoint(x, y, ctx);
  });
}
