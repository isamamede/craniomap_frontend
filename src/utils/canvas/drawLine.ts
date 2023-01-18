import { CanvasRenderingContext2D } from "react-native-canvas";
import { TPoint } from "../../@types/landmarks";
import { colors } from "../../constants/theme";

export default function drawLine(
  begin: TPoint,
  end: TPoint,
  ctx: CanvasRenderingContext2D,
  color: string = colors.primary,
  width: number = 2
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(begin.x, begin.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}
