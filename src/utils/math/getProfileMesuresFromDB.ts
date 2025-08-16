import { TProfilePredictions } from "../../@types/database";
import { IProfileMesures, TMesure } from "../../@types/landmarks";

export default function getProfileMesuresFromDB(
  predictions: TProfilePredictions
): { object: IProfileMesures; array: TMesure[] } {
  const { acf, acm, anl, sml } = predictions;

  return {
    object: { acf, acm, anl, sml },
    array: [acf, acm, anl, sml],
  };
}
