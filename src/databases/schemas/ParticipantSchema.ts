import { tablesNames } from "../../constants/database";

const ParticipantSchema = {
  name: tablesNames.participant,
  properties: {
    _id: "string",
    name: "string",
    created_at: "date",
  },
  primaryKey: "_id",
};

export default ParticipantSchema;
