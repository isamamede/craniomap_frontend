import {
  IProfileMeasures,
  IProfilePredictions,
  MEASURES_NAMES,
  TMeasure,
} from "../../@types/landmarks";
import getAngle from "./getAngle";

export default function getProfileMeasures(
  predictions: IProfilePredictions
): IProfileMeasures {
  const { gn, sn, cer, g, me, np, t, ls, li, cc } = predictions;
  const acf: TMeasure = {
    name: MEASURES_NAMES.ACF,
    type: "angle",
    value: getAngle(g, sn, gn),
  };
  const acm: TMeasure = {
    name: MEASURES_NAMES.ACM,
    type: "angle",
    value: getAngle(me, cer, np),
  };
  const anl: TMeasure = {
    name: MEASURES_NAMES.ANL,
    type: "angle",
    value: getAngle(t, sn, ls),
  };
  const sml: TMeasure = {
    name: MEASURES_NAMES.SML,
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
