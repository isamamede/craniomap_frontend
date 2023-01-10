import { useNavigation } from "@react-navigation/native";
import { Button, Center, Pressable, Text, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Alert, GestureResponderEvent } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { TPoint } from "../../../@types/landmarks";
import CanvasImage from "../../../components/CanvasImage";
import { useImage } from "../../../contexts/ImageContext";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";
import { drawPoint } from "../../../utils/functions/drawPoint";

type CanvasImageHandle = React.ElementRef<typeof CanvasImage>;

export default function ProfilePointsScreen() {
  const navigation = useNavigation();
  const { image } = useImage();
  const canvas = useRef<Canvas>(null);
  const canvasImgRef = useRef<CanvasImageHandle>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [cer, setCer] = useState<TPoint | null>(null);
  const [np, setNp] = useState<TPoint | null>(null);
  const [cc, setCc] = useState<TPoint | null>(null);
  const [drawingPoint, setDrawingPoint] = useState<"Cer" | "Np" | "Cc">("Cer");
  const { setProfilePredictions, profilePredictions } = useProfilePredictions();

  useEffect(() => {
    if (ctx) {
      canvasImgRef.current?.reset(() => {
        if (cer) drawPoint(cer.x, cer.y, ctx);

        if (np) drawPoint(np.x, np.y, ctx);

        if (cc) drawPoint(cc.x, cc.y, ctx);
      });
    }
  }, [cer, np, cc]);

  const onDraw = (ctx: CanvasRenderingContext2D) => {
    setCtx(ctx);
  };

  //handle screen touch to mark points
  const handlePress = (e: GestureResponderEvent) => {
    const x = e.nativeEvent.locationX;
    const y = e.nativeEvent.locationY;
    if (drawingPoint === "Cer") {
      setCer({
        x,
        y,
      });
    }
    if (drawingPoint === "Np") {
      setNp({
        x,
        y,
      });
    }
    if (drawingPoint === "Cc") {
      setCc({
        x,
        y,
      });
    }
  };

  const handleNext = () => {
    if (drawingPoint === "Cer") {
      cer
        ? setDrawingPoint("Np")
        : Alert.alert("Please mark the Cer point first!");
    } else if (drawingPoint === "Np") {
      np
        ? setDrawingPoint("Cc")
        : Alert.alert("Please mark the Np point first!");
    }
  };

  const handleDone = () => {
    if (cer && np && cc && profilePredictions) {
      setProfilePredictions({ ...profilePredictions, cer, np, cc });
      navigation.navigate("ProfileMeasures");
    } else {
      Alert.alert("Please mark the Cer, Np and CC points before proceding");
    }
  };

  return (
    <Center height={"full"}>
      <VStack space={1}>
        <Text
          fontSize="lg"
          color="cyan.500"
        >{`Draw point ${drawingPoint}`}</Text>
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

        {drawingPoint !== "Cc" ? (
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
