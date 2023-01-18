import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMesure } from "../../@types/landmarks";
import { frontalMesuresMap } from "../../constants/mesures";
import drawLine from "./drawLine";
import writeToCanvas from "./writeToCanvas";

export default function drawFrontalMesures(
  ctx: CanvasRenderingContext2D,
  mesure: TMesure,
  prediction: any
) {
  frontalMesuresMap.forEach(({ name, points }) => {
    if (name === mesure.name) {
      const begin = prediction[points.begin];
      const end = prediction[points.end];
      drawLine(begin, end, ctx);
      writeToCanvas(`${mesure.value}cm`, [10, 20], ctx);
    }
  });
}
