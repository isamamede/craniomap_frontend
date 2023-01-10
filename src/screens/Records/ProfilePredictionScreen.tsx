import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "native-base";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { TProfilePredictions } from "../../@types/database";
import { RecordParamList } from "../../@types/navigation";
import Loading from "../../components/Loading";
import PredictionCarousel from "../../components/PredictionsCarousel";
import { tablesNames } from "../../constants/database";
import { getRealm } from "../../databases/realm";
import drawProfileMeasures from "../../utils/functions/drawProfileMeasures";

type TProps = NativeStackScreenProps<RecordParamList, "ProfilePrediction">;

export default function ProfilePredictionScreen({ route }: TProps) {
  const { participant_id } = route.params;
  const [predictions, setPredictions] = useState<TProfilePredictions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPredictions = async () => {
    setLoading(true);
    const db = await getRealm();
    try {
      const response = db
        .objects<TProfilePredictions[]>(tablesNames.profilePred)
        .sorted("created_at")
        .filtered(`participant_id == '${participant_id}'`)
        .toJSON();

      setPredictions(response as TProfilePredictions[]);
    } catch {
      Alert.alert("Error", "Could not fetch particpants");
    } finally {
      db.close();
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPredictions();
    }, [])
  );

  return loading ? (
    <Loading />
  ) : (
    <ScrollView
      pagingEnabled={true}
      snapToAlignment="center"
      showsVerticalScrollIndicator={false}
    >
      {predictions.map((prediction) => {
        const { acf, acm, anl, sml } = prediction;
        const measureArray = [acf, acm, anl, sml];
        return (
          <PredictionCarousel
            h={"full"}
            py={10}
            key={prediction._id}
            measureArray={measureArray}
            imgUrl={prediction.image.url}
            donwloadEnabled={true}
            onDraw={(ctx, item) => {
              drawProfileMeasures(ctx, item, prediction);
            }}
          />
        );
      })}
    </ScrollView>
  );
}
