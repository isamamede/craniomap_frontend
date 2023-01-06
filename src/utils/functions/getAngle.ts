import { TPoint } from "../../@types/landmarks";

/**
 * Calculate the angle ABC (in radians)
 * @param A first point, ex {x:0, y:0}
 * @param B center point
 * @param C second point
 * @returns Angle in degress
 */
export default function getAngle(
  A: TPoint,
  B: TPoint,
  C: TPoint,
  max180: boolean = true
) {
  const radians =
    Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);

  // let degrees = (radians * 180) / Math.PI;
  // return degrees > 90 ? 450 - degrees : 90 - degrees;

  let degrees =
    ((radians >= 0 ? radians : 2 * Math.PI + radians) * 360) / (2 * Math.PI);

  degrees = degrees > 180 && max180 === true ? 360 - degrees : degrees;

  return degrees;
}
