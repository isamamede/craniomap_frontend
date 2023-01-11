import { TParticipant } from "./database";
import { IFrontalMeasures, IProfileMeasures } from "./landmarks";

export type TXLSXData = {
  participant: TParticipant;
  frontalMeasures?: IFrontalMeasures;
  profileMeasures?: IProfileMeasures;
};
