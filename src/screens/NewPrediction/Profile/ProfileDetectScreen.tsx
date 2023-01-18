import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, Center, HStack, Spinner, VStack } from "native-base";
import { useRef, useState } from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { IServerProfilePredictions } from "../../../@types/server";
import CanvasImage from "../../../components/CanvasImage";
import { useImage } from "../../../contexts/ImageContext";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";
import { useServer } from "../../../contexts/Server";
import drawProfile from "../../../utils/canvas/drawProfile";
import getServerProfile from "../../../utils/server/getServerProfile";

export default function ProfileDetectScreen() {
  const navigation = useNavigation();
  const { compreface_url, compreface_api_key } = useServer();
  const { image } = useImage();
  const [loading, setLoading] = useState<boolean>(false);
  const { setProfilePredictions } = useProfilePredictions();
  const canvas = useRef<Canvas>(null);
  const [predictions, setPredictions] =
    useState<IServerProfilePredictions | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const onDraw = (ctx: CanvasRenderingContext2D) => {
    setCtx(ctx);
  };

  const handleDetect = async () => {
    if (image && image.base64) {
      setLoading(true);

      await getServerProfile(compreface_url, image.base64, compreface_api_key)
        .then((response) => {
          setPredictions(response);
          !response
            ? Alert.alert("No predictions recivied :(")
            : Alert.alert("Predictions recivied successfully!");
        })
        .catch((error) => {
          Alert.alert("Error", error);
        });
      setLoading(false);
    }
  };

  const handleDraw = () => {
    if (predictions && ctx) {
      drawProfile(predictions, ctx);
    }
  };

  const handleDone = () => {
    if (predictions) {
      const nullPoint = {
        x: 0,
        y: 0,
      };
      setProfilePredictions({
        ...predictions,
        cer: nullPoint,
        np: nullPoint,
        cc: nullPoint,
      });
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
