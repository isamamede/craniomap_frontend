import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Center } from "native-base";
import React, { useState } from "react";
import { Alert } from "react-native";
import { TPoint } from "../../../@types/landmarks";
import { NewStackParamList } from "../../../@types/navigation";
import ChangePoint from "../../../components/ChangePoint";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";

type TProps = NativeStackScreenProps<
  NewStackParamList,
  "ChangeProfilePointScreen"
>;

export default function ChangeProfilePointScreen({
  route,
  navigation,
}: TProps) {
  const pointsToChange = route.params.pointsToChange;
  const { profilePredictions, setProfilePredictions } = useProfilePredictions();
  const [index, setIndex] = useState<number>(0);
  const key = pointsToChange[index];
  const [point, setPoint] = useState<TPoint | null>(
    profilePredictions ? (profilePredictions as any)[key] : null
  );

  const handleDone = () => {
    if (point && profilePredictions) {
      let obj: any = profilePredictions;
      obj[key] = point;
      setProfilePredictions(obj);
      if (index === pointsToChange.length - 1) {
        navigation.navigate("ProfileMarkPoints");
      } else {
        setIndex(index + 1);
      }
    } else {
      Alert.alert("Please mark the points before proceding");
    }
  };

  return (
    <Center width={"full"} height={"full"}>
      <ChangePoint pointName={key} point={point} setPoint={setPoint} />
      <Button marginTop={"2"} onPress={handleDone} isDisabled={!point}>
        Done
      </Button>
    </Center>
  );
}
