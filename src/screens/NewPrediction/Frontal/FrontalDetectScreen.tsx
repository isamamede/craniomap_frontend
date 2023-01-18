import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, Center, HStack, Spinner, VStack } from "native-base";
import { useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { IFrontalPredictions } from "../../../@types/landmarks";
import CanvasImage from "../../../components/CanvasImage";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";
import drawFront from "../../../utils/canvas/drawFront";
import getServerFrontal from "../../../utils/server/getServerFrontal";

export default function FrontalDetectScreen() {
  const navigation = useNavigation();
  const { image } = useImage();
  const { setFrontalPredictions } = useFrontalPredictions();
  const canvas = useRef<Canvas>(null);
  const [predictions, setPredictions] = useState<IFrontalPredictions | null>(
    null
  );
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDetect = async () => {
    if (image) {
      setLoading(true);

      await getServerFrontal(image.uri)
        .then((response) => {
          if (response) {
            setPredictions(response);
            Alert.alert("Predictions recivied successfully!");
          } else {
            Alert.alert("No predictions recivied :(");
          }
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });

      setLoading(false);
    }
  };

  const onDraw = (contex: CanvasRenderingContext2D) => {
    setCtx(contex);
  };

  const handleDraw = () => {
    if (predictions && ctx) {
      drawFront(predictions, ctx);
    }
  };

  const handleDone = () => {
    if (predictions) {
      setFrontalPredictions(predictions);
      navigation.navigate("ChangeTrPointScreen");
    }
  };

  return (
    <Center height={"full"}>
      {loading && (
        <Center
          height={"full"}
          width="full"
          position={"absolute"}
          style={{ position: "absolute", zIndex: 100 }}
          backgroundColor="dark.50:alpha.70"
        >
          <Spinner
            accessibilityLabel="Loading predictions"
            color={"cyan.500"}
            size="lg"
          />
        </Center>
      )}
      <VStack space={3}>
        <Center marginBottom={3}>
          <HStack space={3}>
            <Button onPress={handleDetect} isDisabled={loading}>
              Detect
            </Button>
            <Button onPress={handleDraw} isDisabled={!predictions || loading}>
              Draw
            </Button>
          </HStack>
        </Center>
        {image && (
          <CanvasImage
            canvasRef={canvas}
            onDraw={onDraw}
            img_url={`data:image/jpg;base64,${image.base64}`}
          />
        )}
        <Button onPress={handleDone} isDisabled={!predictions || loading}>
          Done
        </Button>
      </VStack>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Center>
  );
}
