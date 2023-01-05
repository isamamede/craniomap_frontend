import {
  IProfileMeasures,
  IProfilePredictions,
  MEASURES_NAMES,
  measure,
} from "../../@types/landmarks";
import getAngle from "./getAngle";

export default function getProfileMeasures(
  predictions: IProfilePredictions
): IProfileMeasures {
  const { gn, sn, cer, g, me, np, t, ls, li } = predictions;
  const acf: measure = {
    name: MEASURES_NAMES.ACF,
    type: "angle",
    value: getAngle(g, sn, gn),
  };
  const acm: measure = {
    name: MEASURES_NAMES.ACM,
    type: "angle",
    value: getAngle(me, cer, np),
  };
  const anl: measure = {
    name: MEASURES_NAMES.ANL,
    type: "angle",
    value: getAngle(t, sn, ls),
  };
  const sml: measure = {
    name: MEASURES_NAMES.SML,
    type: "angle",
    value: getAngle(li, gn, me),
  };

  return {
    acf,
    acm,
    anl,
    sml,
  };
}
