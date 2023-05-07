import { TPoint } from "../../@types/landmarks";

/**
 * Get distance between two 2D points
 * @param A first point
 * @param B second point
 * @returns Distance between A and B in pixels
 */
export function getDistance(A: TPoint, B: TPoint): number {
  return Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
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
  const pixels = getDistance(A, B);
  const pixelsPerCm = cmInPx / cm;
  const distance = pixels / pixelsPerCm;

  return distance;
}
