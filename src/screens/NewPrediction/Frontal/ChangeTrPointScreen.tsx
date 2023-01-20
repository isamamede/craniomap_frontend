import { useNavigation } from "@react-navigation/native";
import { Button, Center } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { TPoint } from "../../../@types/landmarks";
import ChangePoint from "../../../components/ChangePoint";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";

export default function ChangeTrPointScreen() {
  const navigation = useNavigation();
  const { frontalPredictions, setFrontalPredictions } = useFrontalPredictions();
  const [tr, setTr] = useState<TPoint | null>(frontalPredictions?.tr || null);

  const handleDone = () => {
    if (tr && frontalPredictions) {
      setFrontalPredictions({ ...frontalPredictions, tr });
      navigation.navigate("FrontalMesures");
    } else {
      Alert.alert("Please mark the Cer, Np and CC points before proceding");
    }
  };

  return (
    <Center width={"full"} height={"full"}>
      <ChangePoint pointName="Tr" point={tr} setPoint={setTr} />
      <Button marginTop={"2"} onPress={handleDone} isDisabled={!tr}>
        Done
      </Button>
    </Center>
  );
}
