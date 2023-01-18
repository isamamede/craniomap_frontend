import { TProfilePredictions } from "../../@types/database";
import { IProfileMeasures, TMeasure } from "../../@types/landmarks";

export default function getProfileMeasuresFromDB(
  predictions: TProfilePredictions
): { object: IProfileMeasures; array: TMeasure[] } {
  const { acf, acm, anl, sml } = predictions;

  return {
    object: { acf, acm, anl, sml },
    array: [acf, acm, anl, sml],
  };
}
