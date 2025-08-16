import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Center } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { TPoint } from "../../../@types/landmarks";
import { NewStackParamList } from "../../../@types/navigation";
import ChangePoint from "../../../components/ChangePoint";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";

type TProps = NativeStackScreenProps<
  NewStackParamList,
  "ChangeFrontalPointScreen"
>;

export default function ChangeFrontalPointScreen({
  route,
  navigation,
}: TProps) {
  const pointsToChange = route.params.pointsToChange;
  let { frontalPredictions, setFrontalPredictions, setFrontalMeasures } =
    useFrontalPredictions();
  const [index, setIndex] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const key = pointsToChange[index];
  const [point, setPoint] = useState<TPoint | null>(
    frontalPredictions ? (frontalPredictions as any)[key] : null
  );

  const handleNext = async () => {
    if (point && frontalPredictions) {
      let obj: any = frontalPredictions;
      obj[key] = point;
      setFrontalPredictions(obj);
      if (index === pointsToChange.length - 1) {
        setFrontalMeasures();
        setDone(true);
      } else {
        setIndex(index + 1);
      }
    } else {
      Alert.alert("Please mark the points before proceding");
    }
  };

  const handleDone = () => {
    navigation.navigate("FrontalMesures");
  };

  return (
    <Center width={"full"} height={"full"}>
      <ChangePoint pointName={key} point={point} setPoint={setPoint} />
      {done ? (
        <Button marginTop={"2"} onPress={handleDone} isDisabled={!point}>
          Done
        </Button>
      ) : (
        <Button marginTop={"2"} onPress={handleNext} isDisabled={!point}>
          Next
        </Button>
      )}
    </Center>
  );
}
