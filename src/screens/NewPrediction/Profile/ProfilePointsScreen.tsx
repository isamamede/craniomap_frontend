import { useNavigation } from "@react-navigation/native";
import { Button, Center, Pressable, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Alert, GestureResponderEvent, StyleSheet } from "react-native";
import Canvas, {
  Image as CanvasImage,
  CanvasRenderingContext2D,
} from "react-native-canvas";
import { Point } from "../../../@types/landmarks";
import { useImage } from "../../../contexts/ImageContext";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";
import { drawPoint } from "../../../utils/functions/drawPoint";
import loadImage from "../../../utils/functions/loadImage";

export default function ProfilePointsScreen() {
  const { image } = useImage();

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [cer, setCer] = useState<Point | null>(null);
  const [np, setNp] = useState<Point | null>(null);
  const [drawingPoint, setDrawingPoint] = useState<"Cer" | "Np">("Cer");
  const [canvasImg, setCanvasImg] = useState<CanvasImage | null>(null);
  const { setProfilePredictions, profilePredictions } = useProfilePredictions();
  const navigation = useNavigation();

  useEffect(() => {
    if (ctx && canvasImg) {
      if (cer) {
        ctx.drawImage(canvasImg, 0, 0);
        drawPoint(cer.x, cer.y, ctx);
      }
      if (np) {
        ctx.drawImage(canvasImg, 0, 0);
        drawPoint(np.x, np.y, ctx);
      }
    }
  }, [cer, np, drawingPoint]);

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
      ctx.save();
      setCtx(ctx);
    }
  };

  //handle screen touch to mark points
  const handlePress = (e: GestureResponderEvent) => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    drawingPoint !== "Np"
      ? setCer({
          x,
          y,
        })
      : setNp({
          x,
          y,
        });
  };

  const handleNext = () => {
    if (cer) {
      setDrawingPoint("Np");
    } else {
      Alert.alert("Please mark the Cer point first!");
    }
  };

  const handleDone = () => {
    if (cer && np && profilePredictions) {
      setProfilePredictions({ ...profilePredictions, cer, np });
      navigation.navigate("ProfileMeasures");
    } else {
      Alert.alert("Please mark the Cer and Np points before proceding");
    }
  };

  return (
    <Center height={"full"}>
      <VStack space={1}>
        <Text
          fontSize="lg"
          color="cyan.500"
        >{`Draw point ${drawingPoint}`}</Text>
        <Pressable style={styles.container} onPress={handlePress}>
          <Canvas style={styles.canvas} ref={handleCanvas} />
        </Pressable>
        {drawingPoint !== "Np" ? (
          <Button onPress={handleNext} marginBottom={"2"} isDisabled={!cer}>
            Next Point!
          </Button>
        ) : (
          <Button
            marginBottom={"2"}
            onPress={handleDone}
            isDisabled={!cer || !np}
          >
            Done
          </Button>
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
