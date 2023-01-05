import { Box, Text } from "native-base";
import {
  IFrontalMeasures,
  IProfileMeasures,
  measure,
} from "../@types/landmarks";

interface IProps {
  measures: IFrontalMeasures | IProfileMeasures;
}

export default function RenderMeasures({ measures }: IProps) {
  return (
    <>
      {Object.values(measures).map((measure: measure) => {
        return (
          <Box key={measure.name}>
            <Text bold>{measure.name}:</Text>
            <Text>
              {measure.value}
              {measure.type === "distance" ? " cm" : " \u00b0" + "C"}
            </Text>
          </Box>
        );
      })}
    </>
  );
}
