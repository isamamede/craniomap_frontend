import { Center, CircleIcon, FlatList, HStack } from "native-base";
import { Dimensions } from "react-native";

import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMeasure } from "../@types/landmarks";
import CanvasImage from "./CanvasImage";

type TProps = {
  onDraw: (ctx: CanvasRenderingContext2D, item: TMeasure) => void;
  w?: string | number;
  h?: string | number;
  measureArray: TMeasure[];
  imgUrl: string;
};

let { width, height } = Dimensions.get("screen");

export default function PredictionCarousel({
  onDraw,
  w = width,
  h = height,
  measureArray,
  imgUrl,
}: TProps) {
  return (
    <FlatList
      data={measureArray}
      horizontal
      pagingEnabled
      maxHeight={h}
      renderItem={({ item, index }) => (
        <Center key={item.name} width={w} padding={2}>
          <CanvasImage img_url={imgUrl} onDraw={(ctx) => onDraw(ctx, item)} />
          <HStack mt={5} justifyContent={"center"}>
            {measureArray.map((_, i) => (
              <CircleIcon
                key={i}
                size={i === index ? "2" : "1.5"}
                m={2}
                color={
                  i === index ? "primary.500:alpha.50" : "coolGray.300:alpha.80"
                }
              />
            ))}
          </HStack>
        </Center>
      )}
    />
  );
}
