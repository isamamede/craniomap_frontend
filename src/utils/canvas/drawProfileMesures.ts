import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMesure } from "../../@types/landmarks";
import { profileMesuresMap } from "../../constants/mesures";
import drawAngle from "./drawAngle";
import writeToCanvas from "./writeToCanvas";

export default function drawProfileMesures(
  ctx: CanvasRenderingContext2D,
  mesure: TMesure,
  prediction: any
) {
  profileMesuresMap.forEach(({ name, points }) => {
    if (name === mesure.name) {
      const begin = prediction[points.begin];
      const center = prediction[points.center];
      const end = prediction[points.end];
      drawAngle(begin, center, end, ctx);
      writeToCanvas(`${mesure.value}\u00b0`, [10, 20], ctx);
    }
  });
}
