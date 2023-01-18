import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Center,
  FormControl,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Alert, GestureResponderEvent } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { TPoint } from "../../../@types/landmarks";
import CanvasImage from "../../../components/CanvasImage";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";
import { drawPoint } from "../../../utils/canvas/drawPoint";

type CanvasImageHandle = React.ElementRef<typeof CanvasImage>;

export default function FrontalDistanceScreen() {
  const navigation = useNavigation();
  const { image } = useImage();
  const { setDistancePoints, setValueInCM } = useFrontalPredictions();
  const canvas = useRef<Canvas>(null);
  const canvasImgRef = useRef<CanvasImageHandle>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [point1, setPoint1] = useState<TPoint | null>(null);
  const [point2, setPoint2] = useState<TPoint | null>(null);
  const [drawingPoint, setDrawingPoint] = useState<"one" | "two">("one");
  const [cm, setCM] = useState<string>("5");

  useEffect(() => {
    if (ctx) {
      canvasImgRef.current?.reset(() => {
        if (point1) {
          drawPoint(point1.x, point1.y, ctx);
        }
        if (point2) drawPoint(point2.x, point2.y, ctx);
      });
    }
  }, [point1, point2]);

  const handleDraw = (ctx: CanvasRenderingContext2D) => {
    setCtx(ctx);
  };

  //handle screen touch to mark points
  const handlePress = (e: GestureResponderEvent) => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    drawingPoint !== "two"
      ? setPoint1({
          x,
          y,
        })
      : setPoint2({
          x,
          y,
        });
  };

  const handleNext = () => {
    if (point1) {
      setDrawingPoint("two");
    } else {
      Alert.alert("Please mark the first point");
    }
  };

  const handleDone = () => {
    if (point1 && point2 && cm) {
      setDistancePoints({ point1, point2 });
      setValueInCM(Number(cm));
      navigation.navigate("FrontalDetect");
    } else {
      Alert.alert("Please mark the 2 points and insert the value in cm");
    }
  };

  return (
    <Center height={"full"}>
      <VStack space={0.5}>
        <Text
          fontSize="lg"
          color="cyan.500"
        >{`Draw point ${drawingPoint}`}</Text>
        {image && (
          <Pressable onPress={handlePress}>
            <CanvasImage
              ref={canvasImgRef}
              canvasRef={canvas}
              onDraw={handleDraw}
              img_url={`data:image/jpg;base64,${image.base64}`}
            />
          </Pressable>
        )}
        {drawingPoint !== "two" ? (
          <Button mt={2} onPress={handleNext} marginBottom="2">
            Next Point!
          </Button>
        ) : (
          <Center>
            <FormControl maxW="300px">
              <FormControl.Label>Distance in cm</FormControl.Label>
              <Input onChangeText={setCM} keyboardType="numeric" value={cm} />
            </FormControl>
            <Button marginTop="1" marginBottom="2" onPress={handleDone}>
              Done
            </Button>
          </Center>
        )}
      </VStack>
    </Center>
  );
}
