import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { Button, Center, HStack, Spinner, VStack } from "native-base";
import { useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { IFrontalPredictions } from "../../../@types/landmarks";
import CanvasImage from "../../../components/CanvasImage";
import { SERVER_URL } from "../../../constants/server";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";
import drawFront from "../../../utils/functions/drawFront";

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

      //load tensorflow predictions
      await FileSystem.uploadAsync(`${SERVER_URL}/front`, image.uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "image",
        httpMethod: "POST",
      })
        .then((response) => {
          const body = JSON.parse(response.body);
          const reciviedPredictions = body["predictions"];
          setPredictions(reciviedPredictions);
          !body["predictions"]
            ? Alert.alert("No predictions recivied :(")
            : Alert.alert("Predictions recivied successfully!");
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
      navigation.navigate("FrontalMeasures");
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
