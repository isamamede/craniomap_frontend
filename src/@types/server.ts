import { Point } from "./landmarks";

export interface IServerProfilePredictions {
  g: Point;
  sn: Point;
  t: Point;
  n: Point;
  gn: Point;
  st: Point;
  me: Point;
  ls: Point;
  li: Point;
}

export type TProfileResponseBody = { predictions: IServerProfilePredictions };
