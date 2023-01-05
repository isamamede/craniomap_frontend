import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { Button, Center, HStack, Spinner, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import Canvas, {
  Image as CanvasImage,
  CanvasRenderingContext2D,
} from "react-native-canvas";
import {
  IServerProfilePredictions,
  TProfileResponseBody,
} from "../../../@types/server";
import { SERVER_URL } from "../../../constants/server";
import { useImage } from "../../../contexts/ImageContext";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";
import drawProfile from "../../../utils/functions/drawProfile";
import loadImage from "../../../utils/functions/loadImage";

export default function ProfileDetectScreen() {
  const { image } = useImage();
  const [predictions, setPredictions] =
    useState<IServerProfilePredictions | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasImg, setCanvasImg] = useState<CanvasImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setProfilePredictions } = useProfilePredictions();
  const navigation = useNavigation();

  useEffect(() => {
    if (ctx && canvasImg) {
      ctx.drawImage(canvasImg, 0, 0);
    }
  }, [ctx, canvasImg]);

  const handleDetect = async () => {
    if (image) {
      setLoading(true);

      //load tensorflow predictions
      await FileSystem.uploadAsync(`${SERVER_URL}/profile`, image.uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "image",
        httpMethod: "POST",
      })
        .then((response) => {
          const body: TProfileResponseBody = JSON.parse(response.body);
          const reciviedPredictions = body["predictions"];
          setPredictions(reciviedPredictions);
          !body["predictions"]
            ? Alert.alert("No predictions recivied :(")
            : Alert.alert("Predictions recivied successfully!");
        })
        .catch((error) => {
          console.log("error", error);
          Alert.alert(error.message);
        });
      setLoading(false);
    }
  };

  const handleDraw = () => {
    if (predictions && ctx && canvasImg) {
      ctx.drawImage(canvasImg, 0, 0);
      drawProfile(predictions, ctx);
      ctx.save();
    }
  };

  const handleCanvas = async (canvas: Canvas) => {
    if (canvas !== null) {
      canvas.width = image ? image.width : canvas.width;
      canvas.height = image ? image.height : canvas.height;
      var ctx = canvas.getContext("2d");
      if (image && !canvasImg) {
        let base64Img = `data:image/jpg;base64,${image.base64}`;
        var background = await loadImage(base64Img, canvas);
        ctx.drawImage(background, 0, 0);
        setCanvasImg(background);
      }
      ctx.save();
      setCtx(ctx);
    }
  };

  const handleDone = () => {
    if (predictions) {
      const nullPoint = {
        x: 0,
        y: 0,
      };
      setProfilePredictions({ ...predictions, cer: nullPoint, np: nullPoint });
      navigation.navigate("ProfileMarkPoints");
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
          backgroundColor="dark.50:alpha.80"
        >
          <Spinner
            accessibilityLabel="Loading predictions"
            color={"cyan.500"}
            size="lg"
          />
        </Center>
      )}
      <VStack space={3}>
        <Center marginTop={2}>
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
          <Center width={image.width} height={image.height}>
            <Canvas style={styles.canvas} ref={handleCanvas} />
          </Center>
        )}
        <Button onPress={handleDone} isDisabled={!predictions || loading}>
          Done
        </Button>
      </VStack>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Center>
  );
}

const styles = StyleSheet.create({
  canvas: {
    position: "absolute",
    zIndex: 9,
  },
});
