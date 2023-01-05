import {
  IFrontalMeasures,
  IFrontalPredictions,
  MEASURES_NAMES,
  measure,
} from "../../@types/landmarks";
import { getDistanceInCM } from "./getDistance";

export default function getFrontalMeasures(
  predictions: IFrontalPredictions,
  cm: number,
  cmInPx: number
): IFrontalMeasures {
  const { gn, n, sn, st, tr, traL, traR } = predictions;
  const cls: measure = {
    type: "distance",
    name: MEASURES_NAMES.CLS,
    value: getDistanceInCM(sn, st, cm, cmInPx),
  };
  const cli: measure = {
    type: "distance",
    name: MEASURES_NAMES.CLI,
    value: getDistanceInCM(st, gn, cm, cmInPx),
  };
  const pl: measure = {
    type: "distance",
    name: MEASURES_NAMES.PL,
    value: cls.value / cli.value,
  };
  const af: measure = {
    type: "distance",
    name: MEASURES_NAMES.AF,
    value: getDistanceInCM(tr, gn, cm, cmInPx),
  };
  const ats: measure = {
    type: "distance",
    name: MEASURES_NAMES.ATS,
    value: getDistanceInCM(tr, n, cm, cmInPx),
  };
  const atm: measure = {
    type: "distance",
    name: MEASURES_NAMES.ATM,
    value: getDistanceInCM(n, sn, cm, cmInPx),
  };
  const ati: measure = {
    type: "distance",
    name: MEASURES_NAMES.ATI,
    value: getDistanceInCM(sn, gn, cm, cmInPx),
  };
  const lf: measure = {
    type: "distance",
    name: MEASURES_NAMES.LF,
    value: getDistanceInCM(traL, traR, cm, cmInPx),
  };
  const pf: measure = {
    type: "distance",
    name: MEASURES_NAMES.PF,
    value: af.value / lf.value,
  };
  const ptmi: measure = {
    type: "distance",
    name: MEASURES_NAMES.PTMI,
    value: atm.value / ati.value,
  };

  return {
    cls,
    cli,
    pl,
    af,
    ats,
    atm,
    ati,
    lf,
    pf,
    ptmi,
  };
}
