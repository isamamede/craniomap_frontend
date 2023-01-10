import { CanvasRenderingContext2D } from "react-native-canvas";

import { IFrontalPredictions } from "../../@types/landmarks";
import { drawPoint } from "./drawPoint";
import writeToCanvas from "./writeToCanvas";

// Drawing Mesh
export default function drawFront(
  predictions: IFrontalPredictions,
  ctx: CanvasRenderingContext2D
) {
  Object.keys(predictions).forEach((key) => {
    const { x, y } = (predictions as any)[key];
    drawPoint(x, y, ctx);
    writeToCanvas(key, [x + 4, y + 3], ctx);
  });
}
