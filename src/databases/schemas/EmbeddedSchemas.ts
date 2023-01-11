import { tablesNames } from "../../constants/database";

export const ImageSchema = {
  name: tablesNames.image,
  embedded: true,
  properties: {
    url: "string",
    public_id: "string",
    signature: "string",
  },
};

export const PointSchema = {
  name: tablesNames.point,
  embedded: true,
  properties: {
    x: "int",
    y: "int",
  },
};

export const MeasureSchema = {
  name: tablesNames.measure,
  embedded: true,
  properties: {
    name: "string",
    type: "string",
    value: "float",
  },
};
