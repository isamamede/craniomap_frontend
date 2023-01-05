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
import { useEffect, useState } from "react";
import { Alert, GestureResponderEvent, StyleSheet } from "react-native";
import Canvas, {
  Image as CanvasImage,
  CanvasRenderingContext2D,
} from "react-native-canvas";
import { Point } from "../../../@types/landmarks";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";
import { drawPoint } from "../../../utils/functions/drawPoint";
import loadImage from "../../../utils/functions/loadImage";

export default function FrontalDistanceScreen() {
  const { image } = useImage();
  const { setDistancePoints, setValueInCM } = useFrontalPredictions();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasImg, setCanvasImg] = useState<CanvasImage | null>(null);
  const [point1, setPoint1] = useState<Point | null>(null);
  const [point2, setPoint2] = useState<Point | null>(null);
  const [drawingPoint, setDrawingPoint] = useState<"one" | "two">("one");
  const [cm, setCM] = useState<string>("5");
  const navigation = useNavigation();

  useEffect(() => {
    if (ctx && canvasImg) {
      if (point1 && !point2) {
        ctx.drawImage(canvasImg, 0, 0);
        drawPoint(point1.x, point1.y, ctx);
        ctx.save();
      }
      if (point1 && point2) {
        ctx.drawImage(canvasImg, 0, 0);
        drawPoint(point1.x, point1.y, ctx);
        drawPoint(point2.x, point2.y, ctx);
      }
    }
  }, [point1, point2, drawingPoint, cm]);

  useEffect(() => {
    if (ctx && canvasImg) {
      ctx.drawImage(canvasImg, 0, 0);
      ctx.save();
    }
  }, [ctx, canvasImg]);

  const handleCanvas = async (canvas: Canvas) => {
    if (canvas !== null) {
      canvas.width = image ? image.width : canvas.width;
      canvas.height = image ? image.height : canvas.height;
      var ctx = canvas.getContext("2d");
      if (image && !canvasImg) {
        let base64Img = `data:image/jpg;base64,${image.base64}`;
        var background = await loadImage(base64Img, canvas);
        setCanvasImg(background);
      }
      setCtx(ctx);
    }
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
          <Pressable
            style={[
              styles.container,
              { width: image.width, height: image.height },
            ]}
            onPress={handlePress}
          >
            <Canvas
              style={[
                styles.canvas,
                { width: image.width, height: image.height },
              ]}
              ref={handleCanvas}
            />
          </Pressable>
        )}
        {drawingPoint !== "two" ? (
          <Button onPress={handleNext} marginBottom="2">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    position: "absolute",
    zIndex: 9,
  },
});
