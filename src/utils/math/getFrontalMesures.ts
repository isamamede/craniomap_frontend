import {
  IFrontalMesures,
  IFrontalPredictions,
  MESURES_NAMES,
  TMesure,
} from "../../@types/landmarks";
import { getDistanceInCM } from "./getDistance";

export default function getFrontalMesures(
  predictions: IFrontalPredictions,
  cm: number,
  cmInPx: number
): IFrontalMesures {
  const { gn, n, sn, st, tr, traL, traR, g } = predictions;

  const af: TMesure = {
    type: "distance",
    name: MESURES_NAMES.AF,
    value: getDistanceInCM(tr, gn, cm, cmInPx),
  };
  const ats: TMesure = {
    type: "distance",
    name: MESURES_NAMES.ATS,
    value: getDistanceInCM(tr, g, cm, cmInPx),
  };
  const atm: TMesure = {
    type: "distance",
    name: MESURES_NAMES.ATM,
    value: getDistanceInCM(g, sn, cm, cmInPx),
  };
  const ati: TMesure = {
    type: "distance",
    name: MESURES_NAMES.ATI,
    value: af.value - (ats.value + atm.value),
  };
  const lf: TMesure = {
    type: "distance",
    name: MESURES_NAMES.LF,
    value: getDistanceInCM(traL, traR, cm, cmInPx),
  };
  const pf: TMesure = {
    type: "distance",
    name: MESURES_NAMES.PF,
    value: af.value / lf.value,
  };
  const ptmi: TMesure = {
    type: "distance",
    name: MESURES_NAMES.PTMI,
    value: atm.value / ati.value,
  };

  const cls: TMesure = {
    type: "distance",
    name: MESURES_NAMES.CLS,
    value: getDistanceInCM(sn, st, cm, cmInPx),
  };
  const cli: TMesure = {
    type: "distance",
    name: MESURES_NAMES.CLI,
    value: ati.value - cls.value,
  };

  const pl: TMesure = {
    type: "distance",
    name: MESURES_NAMES.PL,
    value: cls.value / cli.value,
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
