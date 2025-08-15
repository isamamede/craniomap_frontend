import { tablesNames } from "../../constants/database";

export const ImageSchema = {
  name: tablesNames.image,
  embedded: true,
  properties: {
    url: "string",
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

export const MesureSchema = {
  name: tablesNames.mesure,
  embedded: true,
  properties: {
    name: "string",
    type: "string",
    value: "float",
  },
};
