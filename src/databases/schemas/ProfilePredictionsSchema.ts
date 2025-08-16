import { tablesNames } from "../../constants/database";

const ProfilePredictionsSchema = {
  name: tablesNames.profilePred,
  properties: {
    participant_id: "string",
    image: tablesNames.image,
    g: tablesNames.point,
    sn: tablesNames.point,
    t: tablesNames.point,
    n: tablesNames.point,
    gn: tablesNames.point,
    me: tablesNames.point,
    cer: tablesNames.point,
    np: tablesNames.point,
    st: tablesNames.point,
    ls: tablesNames.point,
    li: tablesNames.point,
    cc: tablesNames.point,
    acf: tablesNames.mesure,
    acm: tablesNames.mesure,
    anl: tablesNames.mesure,
    sml: tablesNames.mesure,
    created_at: "date",
  },
  primaryKey: "participant_id",
};

export default ProfilePredictionsSchema;
