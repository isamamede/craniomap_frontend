import { TFrontalPredictions } from "../../@types/database";
import { IFrontalMesures, TMesure } from "../../@types/landmarks";

export default function getFrontalMesuresFromDB(
  predictions: TFrontalPredictions | IFrontalMesures
): {
  object: IFrontalMesures;
  objectWithoutP: Omit<IFrontalMesures, "pf" | "pl" | "ptmi">;
  array: TMesure[];
  arrayWithoutP: TMesure[];
} {
  const { cls, cli, af, ats, atm, ati, lf, pf, pl, ptmi } = predictions;

  return {
    object: { cls, cli, af, ats, atm, ati, lf, pf, pl, ptmi },
    objectWithoutP: { cls, cli, af, ats, atm, ati, lf },
    array: [cls, cli, af, ats, atm, ati, lf, pf, pl, ptmi],
    arrayWithoutP: [cls, cli, af, ats, atm, ati, lf],
  };
}
