import { tablesNames } from "../../constants/database";

const ProfilePredictionsSchema = {
  name: tablesNames.profilePred,
  properties: {
    _id: "string",
    image: tablesNames.image,
    participant_id: "string",
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
    acf: tablesNames.measure,
    acm: tablesNames.measure,
    anl: tablesNames.measure,
    sml: tablesNames.measure,
    created_at: "date",
  },
  primaryKey: "_id",
};

export default ProfilePredictionsSchema;
