import { TPoint } from "../../@types/landmarks";

/**
 * Get distance between two 2D points
 * @param A first point
 * @param B second point
 * @returns Distance between A and B in pixels
 */
export function getDistance(A: TPoint, B: TPoint): number {
  let y = B.x - A.x;
  let x = B.y - A.y;
  return Math.sqrt(x * x + y * y);
}

/**
 * Get distance between two 2D points
 * @param A first point
 * @param B second point
 * @returns Distance between A and B in cm
 */
export function getDistanceInCM(
  A: TPoint,
  B: TPoint,
  cm: number,
  cmInPx: number
): number {
  let y = B.x - A.x;
  let x = B.y - A.y;

  const distancePx = Math.sqrt(x * x + y * y);
  const distance = (distancePx * cm) / cmInPx;
  return distance;
}
