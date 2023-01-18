import { tablesNames } from "../../constants/database";

const FrontalPredictionsSchema = {
  name: tablesNames.frontalPred,
  properties: {
    participant_id: "string",
    image: tablesNames.image,
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
    cls: tablesNames.mesure,
    cli: tablesNames.mesure,
    pl: tablesNames.mesure,
    af: tablesNames.mesure,
    ats: tablesNames.mesure,
    atm: tablesNames.mesure,
    ati: tablesNames.mesure,
    lf: tablesNames.mesure,
    pf: tablesNames.mesure,
    ptmi: tablesNames.mesure,
    created_at: "date",
  },
  primaryKey: "participant_id",
};

export default FrontalPredictionsSchema;
