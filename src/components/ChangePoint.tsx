import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Pressable, Text, VStack, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { GestureResponderEvent } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { TPoint } from "../@types/landmarks";
import { useImage } from "../contexts/ImageContext";
import { drawPoint } from "../utils/canvas/drawPoint";
import CanvasImage from "./CanvasImage";

type CanvasImageHandle = React.ElementRef<typeof CanvasImage>;

interface IProps {
  setPoint: React.Dispatch<React.SetStateAction<TPoint | null>>;
  point: TPoint | null;
  pointName: string;
  zoomable_viewRef?: React.RefObject<ReactNativeZoomableView>;
}

export default function ChangePoint({
  setPoint,
  point,
  pointName,
  zoomable_viewRef,
}: IProps) {
  const { image } = useImage();
  const canvas = useRef<Canvas>(null);
  const canvasImgRef = useRef<CanvasImageHandle>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (ctx) {
      canvasImgRef.current?.reset(() => {
        if (point) drawPoint(point.x, point.y, ctx);
      });
    }
  }, [point]);

  const onDraw = (ctx: CanvasRenderingContext2D) => {
    setCtx(ctx);
  };

  const handlePress = (e: GestureResponderEvent) => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    setPoint({
      x,
      y,
    });
  };

  return (
    <VStack space={1}>
      <Text fontSize="lg">{`Mark point ${pointName.toUpperCase()}`}</Text>
      {image && (
        <View height={image.height} width={image.width}>
          <ReactNativeZoomableView
            ref={zoomable_viewRef}
            maxZoom={15}
            minZoom={1}
            initialZoom={1}
            contentWidth={image.width}
            contentHeight={image.height}
          >
            <Pressable onPress={handlePress}>
              <CanvasImage
                ref={canvasImgRef}
                canvasRef={canvas}
                onDraw={onDraw}
                img_url={`data:image/jpg;base64,${image.base64}`}
              />
            </Pressable>
          </ReactNativeZoomableView>
        </View>
      )}
    </VStack>
  );
}
