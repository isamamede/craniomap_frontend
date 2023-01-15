import { Pressable, Text, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { GestureResponderEvent } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { TPoint } from "../@types/landmarks";
import { useImage } from "../contexts/ImageContext";
import { drawPoint } from "../utils/functions/drawPoint";
import CanvasImage from "./CanvasImage";

type CanvasImageHandle = React.ElementRef<typeof CanvasImage>;

interface IProps {
  setPoint: React.Dispatch<React.SetStateAction<TPoint | null>>;
  point: TPoint | null;
  pointName: string;
}

export default function ChangePoint({ setPoint, point, pointName }: IProps) {
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
      <Text fontSize="lg" color="cyan.500">{`Draw point ${pointName}`}</Text>
      {image && (
        <Pressable onPress={handlePress}>
          <CanvasImage
            ref={canvasImgRef}
            canvasRef={canvas}
            onDraw={onDraw}
            img_url={`data:image/jpg;base64,${image.base64}`}
          />
        </Pressable>
      )}
    </VStack>
  );
}
