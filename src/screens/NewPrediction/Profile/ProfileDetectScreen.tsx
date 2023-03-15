import { useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, VStack } from "native-base";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { IServerProfilePredictions } from "../../../@types/server";
import CanvasImage from "../../../components/CanvasImage";
import ChangePointsModal from "../../../components/ChangePointsModal";
import Loading from "../../../components/Loading";
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
  const [visible, setVisible] = useState<boolean>(false);
  const [pointsToChange, setPointsToChange] = useState<string[]>([]);

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
      pointsToChange.length > 0
        ? navigation.navigate("ChangeProfilePointScreen", { pointsToChange })
        : navigation.navigate("ProfileMarkPoints");
    }
  };

  return (
    <Center height={"full"}>
      {loading && <Loading />}
      {predictions && (
        <ChangePointsModal
          setVisible={setVisible}
          visible={visible}
          predictions={predictions}
          pointsToChange={pointsToChange}
          setPointsToChange={setPointsToChange}
        />
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
        <HStack justifyContent={"center"} space={3}>
          <Button
            onPress={() => setVisible(true)}
            isDisabled={!predictions || loading}
          >
            Change Points
          </Button>
          <Button onPress={handleDone} isDisabled={!predictions || loading}>
            Done
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}
