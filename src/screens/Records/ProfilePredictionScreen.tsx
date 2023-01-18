import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { TProfilePredictions } from "../../@types/database";
import { RecordParamList } from "../../@types/navigation";
import Loading from "../../components/Loading";
import PredictionCarousel from "../../components/PredictionsCarousel";
import { tablesNames } from "../../constants/database";
import { getRealm } from "../../databases/realm";
import drawProfileMesures from "../../utils/canvas/drawProfileMesures";
import getProfileMesuresFromDB from "../../utils/math/getProfileMesuresFromDB";

type TProps = NativeStackScreenProps<RecordParamList, "ProfilePrediction">;

export default function ProfilePredictionScreen({ route }: TProps) {
  const { participant_id } = route.params;
  const [predictions, setPredictions] = useState<TProfilePredictions | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPredictions = async () => {
    setLoading(true);
    const db = await getRealm();
    try {
      const response = db
        .objectForPrimaryKey<TProfilePredictions>(
          tablesNames.profilePred,
          participant_id
        )
        ?.toJSON();

      setPredictions(response as TProfilePredictions);
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

  const mesureArray = useMemo(() => {
    if (predictions) {
      return getProfileMesuresFromDB(predictions).array;
    }
    return [];
  }, [predictions]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {predictions && (
        <PredictionCarousel
          key={predictions.participant_id}
          mesureArray={mesureArray}
          imgUrl={predictions.image.url}
          donwloadEnabled={true}
          onDraw={(ctx, item) => {
            drawProfileMesures(ctx, item, predictions);
          }}
        />
      )}
    </>
  );
}
