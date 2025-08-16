import { Center, CircleIcon, FlatList, HStack, StyledProps } from "native-base";
import { Dimensions } from "react-native";

import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMesure } from "../@types/landmarks";
import ImageDownloader from "./ImageDownloader";

type TProps = {
  onDraw: (ctx: CanvasRenderingContext2D, item: TMesure) => void;
  mesureArray: TMesure[];
  imgUrl: string;
  donwloadEnabled?: boolean;
} & StyledProps;

let { width } = Dimensions.get("screen");

export default function PredictionCarousel({
  onDraw,
  w = width,
  h,
  mesureArray,
  imgUrl,
  donwloadEnabled = true,
  ...props
}: TProps) {
  return (
    // @ts-ignore
    <FlatList
      data={mesureArray}
      horizontal
      pagingEnabled
      h={h}
      showsHorizontalScrollIndicator={false}
      {...props}
      renderItem={({ item, index }) => (
        <Center key={item.name} width={w}>
          <HStack mb={3} justifyContent={"center"}>
            {mesureArray.map((_, i) => (
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
          <ImageDownloader
            img_url={imgUrl}
            onDraw={(ctx) => onDraw(ctx, item)}
            downloadEnabled={donwloadEnabled}
          />
        </Center>
      )}
    />
  );
}
