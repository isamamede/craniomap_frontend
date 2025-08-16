import { Center, Spinner } from "native-base";
import { ILinearGradientProps } from "native-base/lib/typescript/components/primitives/Box/types";
import {
  ColorType,
  ResponsiveValue,
} from "native-base/lib/typescript/components/types";
import { Dimensions } from "react-native";

interface IProps {
  bgColor?: ResponsiveValue<ColorType | ILinearGradientProps>;
}

export default function Loading({ bgColor }: IProps) {
  return (
    <Center
      height={Dimensions.get("window").height}
      width={Dimensions.get("window").width}
      position={"absolute"}
      style={{ position: "absolute", zIndex: 100 }}
      backgroundColor={bgColor || "dark.50:alpha.20"}
    >
      <Spinner accessibilityLabel="Loading" color={"primary.500"} size="lg" />
    </Center>
  );
}
