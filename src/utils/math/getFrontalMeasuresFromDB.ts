import { TFrontalPredictions } from "../../@types/database";
import { IFrontalMeasures, TMeasure } from "../../@types/landmarks";

export default function getFrontalMeasuresFromDB(
  predictions: TFrontalPredictions | IFrontalMeasures
): {
  object: IFrontalMeasures;
  objectWithoutP: Omit<IFrontalMeasures, "pf" | "pl" | "ptmi">;
  array: TMeasure[];
  arrayWithoutP: TMeasure[];
} {
  const { cls, cli, af, ats, atm, ati, lf, pf, pl, ptmi } = predictions;

  return {
    object: { cls, cli, af, ats, atm, ati, lf, pf, pl, ptmi },
    objectWithoutP: { cls, cli, af, ats, atm, ati, lf },
    array: [cls, cli, af, ats, atm, ati, lf, pf, pl, ptmi],
    arrayWithoutP: [cls, cli, af, ats, atm, ati, lf],
  };
}
