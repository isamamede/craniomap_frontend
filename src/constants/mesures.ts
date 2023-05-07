import { IFrontalType, IProfileType, MESURES_NAMES } from "../@types/landmarks";

export const profileMesuresMap: IProfileType[] = [
  {
    name: MESURES_NAMES.ACF,
    points: {
      begin: "g",
      center: "sn",
      end: "gn",
    },
  },
  {
    name: MESURES_NAMES.ACM,
    points: {
      begin: "me",
      center: "cer",
      end: "np",
    },
  },
  {
    name: MESURES_NAMES.ANL,
    points: {
      begin: "t",
      center: "sn",
      end: "ls",
    },
  },
  {
    name: MESURES_NAMES.SML,
    points: {
      begin: "li",
      center: "cc",
      end: "gn",
    },
  },
];

export const frontalMesuresMap: IFrontalType[] = [
  {
    name: MESURES_NAMES.CLS,
    points: {
      begin: "sn",
      end: "st",
    },
  },
  {
    name: MESURES_NAMES.CLI,
    points: {
      begin: "st",
      end: "gn",
    },
  },
  {
    name: MESURES_NAMES.AF,
    points: {
      begin: "tr",
      end: "gn",
    },
  },
  {
    name: MESURES_NAMES.ATS,
    points: {
      begin: "tr",
      end: "g",
    },
  },
  {
    name: MESURES_NAMES.ATM,
    points: {
      begin: "g",
      end: "sn",
    },
  },
  {
    name: MESURES_NAMES.ATI,
    points: {
      begin: "sn",
      end: "gn",
    },
  },
  {
    name: MESURES_NAMES.LF,
    points: {
      begin: "traR",
      end: "traL",
    },
  },
];
