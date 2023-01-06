import { tablesNames } from "../../constants/database";

const FrontalPredictionsSchema = {
  name: tablesNames.frontalPred,
  properties: {
    _id: "string",
    image: tablesNames.image,
    participant_id: "string",
    g: tablesNames.point,
    sn: tablesNames.point,
    t: tablesNames.point,
    n: tablesNames.point,
    gn: tablesNames.point,
    tr: tablesNames.point,
    st: tablesNames.point,
    zyR: tablesNames.point,
    zyL: tablesNames.point,
    traR: tablesNames.point,
    traL: tablesNames.point,
    cls: tablesNames.measure,
    cli: tablesNames.measure,
    pl: tablesNames.measure,
    af: tablesNames.measure,
    ats: tablesNames.measure,
    atm: tablesNames.measure,
    ati: tablesNames.measure,
    lf: tablesNames.measure,
    pf: tablesNames.measure,
    ptmi: tablesNames.measure,
    created_at: "date",
  },
  primaryKey: "_id",
};

export default FrontalPredictionsSchema;
