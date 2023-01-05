export type Point = { x: number; y: number };

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

export type measure = {
  name: MEASURES_NAMES;
  type: "angle" | "distance";
  value: number;
};

export interface IFrontalPredictions {
  g: Point;
  sn: Point;
  t: Point;
  n: Point;
  gn: Point;
  tr: Point;
  st: Point;
  zyR: Point;
  zyL: Point;
  traR: Point;
  traL: Point;
}

export interface IFrontalMeasures {
  cls: measure;
  cli: measure;
  pl: measure;
  af: measure;
  ats: measure;
  atm: measure;
  ati: measure;
  lf: measure;
  pf: measure;
  ptmi: measure;
}

export interface IProfilePredictions {
  g: Point;
  sn: Point;
  t: Point;
  n: Point;
  gn: Point;
  me: Point;
  cer: Point;
  np: Point;
  st: Point;
  ls: Point;
  li: Point;
}
export interface IProfileMeasures {
  acf: measure;
  acm: measure;
  anl: measure;
  sml: measure;
}
