import Realm from "realm";
import {
  ImageSchema,
  MesureSchema,
  PointSchema,
} from "./schemas/EmbeddedSchemas";
import FrontalPredictionsSchema from "./schemas/FrontalPredictionsSchema";
import ParticipantSchema from "./schemas/ParticipantSchema";
import ProfilePredictionsSchema from "./schemas/ProfilePredictionsSchema";

export const getRealm = async () =>
  await Realm.open({
    path: "face-mesures",
    schema: [
      ParticipantSchema,
      ProfilePredictionsSchema,
      FrontalPredictionsSchema,
      ImageSchema,
      PointSchema,
      MesureSchema,
    ],
    schemaVersion: 1,
  });
