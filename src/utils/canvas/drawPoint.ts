import { CanvasRenderingContext2D } from "react-native-canvas";
import { colors } from "../../constants/theme";

export function drawPoint(
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  color: string = colors.primary
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
  ctx.fill();
}
