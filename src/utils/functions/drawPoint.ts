import { CanvasRenderingContext2D } from "react-native-canvas";

export function drawPoint(
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  color: string = "blue"
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
  ctx.fill();
}
