import {
  IProfileMesures,
  IProfilePredictions,
  MESURES_NAMES,
  TMesure,
} from "../../@types/landmarks";
import getAngle from "./getAngle";

export default function getProfileMesures(
  predictions: IProfilePredictions
): IProfileMesures {
  const { gn, sn, cer, g, me, np, t, ls, li, cc } = predictions;
  const acf: TMesure = {
    name: MESURES_NAMES.ACF,
    type: "angle",
    value: getAngle(g, sn, gn, true),
  };
  const acm: TMesure = {
    name: MESURES_NAMES.ACM,
    type: "angle",
    value: getAngle(me, cer, np),
  };
  const anl: TMesure = {
    name: MESURES_NAMES.ANL,
    type: "angle",
    value: getAngle(t, sn, ls),
  };
  const sml: TMesure = {
    name: MESURES_NAMES.SML,
    type: "angle",
    value: getAngle(li, cc, gn),
  };

  return {
    acf,
    acm,
    anl,
    sml,
  };
}
