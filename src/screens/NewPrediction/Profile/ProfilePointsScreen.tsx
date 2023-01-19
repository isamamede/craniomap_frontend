import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { useNavigation } from "@react-navigation/native";
import { Button, Center, VStack } from "native-base";
import React, { useRef, useState } from "react";
import { Alert } from "react-native";
import { TPoint } from "../../../@types/landmarks";
import ChangePoint from "../../../components/ChangePoint";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";

type TZoomableViewRef = React.ElementRef<typeof ReactNativeZoomableView>;

export default function ProfilePointsScreen() {
  const navigation = useNavigation();
  const zoomable_viewRef = useRef<TZoomableViewRef>(null);
  const [cer, setCer] = useState<TPoint | null>(null);
  const [np, setNp] = useState<TPoint | null>(null);
  const [cc, setCc] = useState<TPoint | null>(null);
  const [drawingPoint, setDrawingPoint] = useState<"Cer" | "Np" | "Cc">("Cer");
  const { setProfilePredictions, profilePredictions } = useProfilePredictions();

  const handleNext = () => {
    zoomable_viewRef.current?.zoomTo(1);
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
    zoomable_viewRef.current?.zoomTo(1);
    if (cer && np && cc && profilePredictions) {
      setProfilePredictions({ ...profilePredictions, cer, np, cc });
      navigation.navigate("ProfileMesures");
    } else {
      Alert.alert("Please mark the Cer, Np and CC points before proceding");
    }
  };

  const point = drawingPoint === "Cer" ? cer : drawingPoint === "Np" ? np : cc;
  const setPoint =
    drawingPoint === "Cer" ? setCer : drawingPoint === "Np" ? setNp : setCc;

  return (
    <Center height={"full"}>
      <VStack space={1}>
        <ChangePoint
          point={point}
          setPoint={setPoint}
          pointName={drawingPoint}
          zoomable_viewRef={zoomable_viewRef}
        />
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
