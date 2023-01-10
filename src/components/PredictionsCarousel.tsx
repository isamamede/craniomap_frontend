import { Center, CircleIcon, FlatList, HStack, StyledProps } from "native-base";
import { Dimensions } from "react-native";

import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMeasure } from "../@types/landmarks";
import ImageDownloader from "./ImageDownloader";

type TProps = {
  onDraw: (ctx: CanvasRenderingContext2D, item: TMeasure) => void;
  measureArray: TMeasure[];
  imgUrl: string;
  donwloadEnabled?: boolean;
} & StyledProps;

let { width } = Dimensions.get("screen");

export default function PredictionCarousel({
  onDraw,
  w = width,
  h,
  measureArray,
  imgUrl,
  donwloadEnabled = true,
  ...props
}: TProps) {
  return (
    <FlatList
      data={measureArray}
      horizontal
      pagingEnabled
      h={h}
      showsHorizontalScrollIndicator={false}
      {...props}
      renderItem={({ item, index }) => (
        <Center key={item.name} width={w}>
          <ImageDownloader
            img_url={imgUrl}
            onDraw={(ctx) => onDraw(ctx, item)}
            downloadEnabled={donwloadEnabled}
          />
          <HStack mt={2} justifyContent={"center"}>
            {measureArray.map((_, i) => (
              <CircleIcon
                key={i}
                size={i === index ? "2" : "1.5"}
                mx={2}
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
