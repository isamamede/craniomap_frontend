import { TPoint } from "./landmarks";

export interface IServerProfilePredictions {
  g: TPoint;
  sn: TPoint;
  t: TPoint;
  n: TPoint;
  gn: TPoint;
  st: TPoint;
  me: TPoint;
  ls: TPoint;
  li: TPoint;
}

export type TProfileResponseBody = { predictions: IServerProfilePredictions };
