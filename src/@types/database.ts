import { TMesure, TPoint } from "./landmarks";

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
  acf: TMesure;
  acm: TMesure;
  anl: TMesure;
  sml: TMesure;
  created_at: Date;
};
