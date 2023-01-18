import { CanvasRenderingContext2D } from "react-native-canvas";
import { colors } from "../../constants/theme";

export default function writeToCanvas(
  text: string,
  where: [number, number],
  ctx: CanvasRenderingContext2D,
  color: string = colors.primary,
  font: string = "12px Arial"
) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, where[0], where[1]);
}
