import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { tablesNames } from "constants/database";
import { getRealm } from "databases/realm";
import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { TFrontalPredictions } from "../../@types/database";
import { TMesure } from "../../@types/landmarks";
import { RecordParamList } from "../../@types/navigation";
import Loading from "../../components/Loading";
import PredictionCarousel from "../../components/PredictionsCarousel";
import drawFrontalMesures from "../../utils/canvas/drawFrontalMesures";
import getFrontalMesuresFromDB from "../../utils/math/getFrontalMesuresFromDB";

type TProps = NativeStackScreenProps<RecordParamList, "FrontalPrediction">;

export default function FrontalPredictionScreen({ route }: TProps) {
  const { participant_id } = route.params;
  const [predictions, setPredictions] = useState<TFrontalPredictions | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPredictions = async () => {
    setLoading(true);
    const db = await getRealm();
    try {
      const response = db
        .objectForPrimaryKey<TFrontalPredictions>(
          tablesNames.profilePred,
          participant_id
        )
        ?.toJSON();

      setPredictions(response as TFrontalPredictions);
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

  const mesureArray: TMesure[] = useMemo(() => {
    if (predictions) {
      return getFrontalMesuresFromDB(predictions).arrayWithoutP;
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
          onDraw={(ctx, item) => {
            drawFrontalMesures(ctx, item, predictions);
          }}
        />
      )}
    </>
  );
}
