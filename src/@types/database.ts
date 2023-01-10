import { TMeasure, TPoint } from "./landmarks";

/**
 * Database schema structure for participant table
 */
export type TParticipant = {
  _id: string;
  name: string;
  created_at: Date;
};

/**
 * Database embedded schema structure for image table
 */
export type TImage = {
  url: string;
  public_id: string;
  signature: string;
};

/**
 * Database schema structure for frontal predictions table
 */
export type TFrontalPredictions = {
  participant_id: string;
  image: TImage;
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
  created_at: Date;
};

/**
 * Database schema structure for profile predictions table
 */
export type TProfilePredictions = {
  participant_id: string;
  image: TImage;
  cc: TPoint;
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
  acf: TMeasure;
  acm: TMeasure;
  anl: TMeasure;
  sml: TMeasure;
  created_at: Date;
};
