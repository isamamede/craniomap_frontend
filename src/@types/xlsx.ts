import { TParticipant } from "./database";
import { IFrontalMesures, IProfileMesures } from "./landmarks";

export type TXLSXData = {
  participant: TParticipant;
  frontalMesures?: IFrontalMesures;
  profileMesures?: IProfileMesures;
};
