export type TPoint = { x: number; y: number };

export enum MEASURES_NAMES {
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

export type TMeasure = {
  name: MEASURES_NAMES;
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

export interface IFrontalMeasures {
  cls: TMeasure;
  cli: TMeasure;
  pl: TMeasure;
  af: TMeasure;
  ats: TMeasure;
  atm: TMeasure;
  ati: TMeasure;
  lf: TMeasure;
  pf: TMeasure;
  ptmi: TMeasure;
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
}
export interface IProfileMeasures {
  acf: TMeasure;
  acm: TMeasure;
  anl: TMeasure;
  sml: TMeasure;
}
