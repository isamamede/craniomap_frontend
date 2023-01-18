export type TPoint = { x: number; y: number };

export enum MESURES_NAMES {
  CLS = "Comprimento labial superior",
  CLI = "Comprimento labial inferior",
  PL = "Proporção labial",
  AF = "Altura facial",
  ATS = "Altura terço superior",
  ATM = "Altura terço médio",
  ATI = "Altura terço inferior",
  LF = "Largura facial",
  PF = "Proporção facial",
  PTMI = "Proporção terço médio e inferior",
  ACF = "Ângulo da convexidade da face",
  ACM = "Ângulo cervicomental",
  ANL = "Ângulo nasolabial",
  SML = "Sulco mentolabial",
}

export type TMesure = {
  name: MESURES_NAMES;
  type: "angle" | "distance";
  value: number;
};

export interface IFrontalPredictions {
  g: TPoint;
  sn: TPoint;
  t: TPoint;
  n: TPoint;
  gn: TPoint;
  tr: TPoint;
  st: TPoint;
  zyR: TPoint;
  zyL: TPoint;
  traR: TPoint;
  traL: TPoint;
}

export interface IFrontalMesures {
  cls: TMesure;
  cli: TMesure;
  pl: TMesure;
  af: TMesure;
  ats: TMesure;
  atm: TMesure;
  ati: TMesure;
  lf: TMesure;
  pf: TMesure;
  ptmi: TMesure;
}

export interface IProfilePredictions {
  g: TPoint;
  sn: TPoint;
  t: TPoint;
  n: TPoint;
  gn: TPoint;
  me: TPoint;
  cer: TPoint;
  np: TPoint;
  st: TPoint;
  ls: TPoint;
  li: TPoint;
  cc: TPoint;
}
export interface IProfileMesures {
  acf: TMesure;
  acm: TMesure;
  anl: TMesure;
  sml: TMesure;
}

export type TProfileMesureName = "acf" | "acm" | "anl" | "sml";
export type TPointsName =
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
  | "traR"
  | "cc";

export interface IProfileType {
  name: MESURES_NAMES;
  points: {
    begin: TPointsName;
    center: TPointsName;
    end: TPointsName;
  };
}

export interface IFrontalType {
  name: MESURES_NAMES;
  points: {
    begin: TPointsName;

    end: TPointsName;
  };
}
