import Realm from "realm";
import {
  ImageSchema,
  MeasureSchema,
  PointSchema,
} from "./schemas/EmbeddedSchemas";
import FrontalPredictionsSchema from "./schemas/FrontalPredictionsSchema";
import ParticipantSchema from "./schemas/ParticipantSchema";
import ProfilePredictionsSchema from "./schemas/ProfilePredictionsSchema";

export const getRealm = async () =>
  await Realm.open({
    path: "face-measures",
    schema: [
      ParticipantSchema,
      ProfilePredictionsSchema,
      FrontalPredictionsSchema,
      ImageSchema,
      PointSchema,
      MeasureSchema,
    ],
    schemaVersion: 2,
  });
