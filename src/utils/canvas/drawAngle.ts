import { CanvasRenderingContext2D } from "react-native-canvas";
import { TPoint } from "../../@types/landmarks";
import { colors } from "../../constants/theme";

export default function drawAngle(
  beginPoint: TPoint,
  centerPoint: TPoint,
  endPoint: TPoint,
  ctx: CanvasRenderingContext2D,
  color: string = colors.primary,
  width: number = 2
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(beginPoint.x, beginPoint.y);
  ctx.lineTo(centerPoint.x, centerPoint.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerPoint.x, centerPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.stroke();
}
