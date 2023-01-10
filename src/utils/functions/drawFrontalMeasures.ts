import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMeasure } from "../../@types/landmarks";
import { frontalMeasuresMap } from "../../constants/measures";
import drawLine from "./drawLine";
import writeToCanvas from "./writeToCanvas";

export default function drawFrontalMeasures(
  ctx: CanvasRenderingContext2D,
  measure: TMeasure,
  prediction: any
) {
  frontalMeasuresMap.forEach(({ name, points }) => {
    if (name === measure.name) {
      const begin = prediction[points.begin];
      const end = prediction[points.end];
      drawLine(begin, end, ctx);
      writeToCanvas(`${measure.value}cm`, [10, 20], ctx);
    }
  });
}
