import { MEASURES_NAMES } from "../@types/landmarks";

export type TProfileMeasureName = "acf" | "acm" | "anl" | "sml";
type TPointsName =
  | "gn"
  | "sn"
  | "cer"
  | "g"
  | "me"
  | "np"
  | "t"
  | "ls"
  | "li"
  | "st"
  | "tr"
  | "n"
  | "traL"
  | "traR";

interface IProfileType {
  name: MEASURES_NAMES;
  points: {
    begin: TPointsName;
    center: TPointsName;
    end: TPointsName;
  };
}

interface IFrontalType {
  name: MEASURES_NAMES;
  points: {
    begin: TPointsName;

    end: TPointsName;
  };
}

export const profileMeasuresMap: IProfileType[] = [
  {
    name: MEASURES_NAMES.ACF,
    points: {
      begin: "g",
      center: "sn",
      end: "gn",
    },
  },
  {
    name: MEASURES_NAMES.ACM,
    points: {
      begin: "me",
      center: "cer",
      end: "np",
    },
  },
  {
    name: MEASURES_NAMES.ANL,
    points: {
      begin: "t",
      center: "sn",
      end: "ls",
    },
  },
  {
    name: MEASURES_NAMES.SML,
    points: {
      begin: "li",
      center: "gn",
      end: "me",
    },
  },
];

export const frontalMeasuresMap: IFrontalType[] = [
  {
    name: MEASURES_NAMES.CLS,
    points: {
      begin: "sn",
      end: "st",
    },
  },
  {
    name: MEASURES_NAMES.CLI,
    points: {
      begin: "st",
      end: "gn",
    },
  },
  {
    name: MEASURES_NAMES.AF,
    points: {
      begin: "tr",
      end: "gn",
    },
  },
  {
    name: MEASURES_NAMES.ATS,
    points: {
      begin: "tr",
      end: "n",
    },
  },
  {
    name: MEASURES_NAMES.ATM,
    points: {
      begin: "n",
      end: "sn",
    },
  },
  {
    name: MEASURES_NAMES.ATI,
    points: {
      begin: "sn",
      end: "gn",
    },
  },
  {
    name: MEASURES_NAMES.LF,
    points: {
      begin: "traL",
      end: "traR",
    },
  },
];
