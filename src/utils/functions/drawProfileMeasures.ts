import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMeasure } from "../../@types/landmarks";
import { profileMeasuresMap } from "../../constants/measures";
import drawAngle from "./drawAngle";
import writeToCanvas from "./writeToCanvas";

export default function drawProfileMeasures(
  ctx: CanvasRenderingContext2D,
  measure: TMeasure,
  prediction: any
) {
  profileMeasuresMap.forEach(({ name, points }) => {
    if (name === measure.name) {
      const begin = prediction[points.begin];
      const center = prediction[points.center];
      const end = prediction[points.end];
      drawAngle(begin, center, end, ctx);
      writeToCanvas(`${measure.value}\u00b0`, [10, 20], ctx);
    }
  });
}
