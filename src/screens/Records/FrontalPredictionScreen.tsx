import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { CanvasRenderingContext2D } from "react-native-canvas";
import { TFrontalPredictions } from "../../@types/database";
import { TMeasure } from "../../@types/landmarks";
import { RecordParamList } from "../../@types/navigation";
import Loading from "../../components/Loading";
import PredictionCarousel from "../../components/PredictionsCarousel";
import { colors } from "../../constants/colors";
import { tablesNames } from "../../constants/database";
import { frontalMeasuresMap } from "../../constants/measures";
import { getRealm } from "../../databases/realm";
import drawLine from "../../utils/functions/drawLine";

type TProps = NativeStackScreenProps<RecordParamList, "FrontalPrediction">;

export default function FrontalPredictionScreen({ route }: TProps) {
  const { participant_id } = route.params;
  const [predictions, setPredictions] = useState<TFrontalPredictions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPredictions = async () => {
    setLoading(true);
    const db = await getRealm();
    try {
      const response = db
        .objects<TFrontalPredictions[]>(tablesNames.frontalPred)
        .sorted("created_at")
        .filtered(`participant_id == '${participant_id}'`)
        .toJSON();

      setPredictions(response as TFrontalPredictions[]);
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

  const handleDraw = async (
    ctx: CanvasRenderingContext2D,
    measure: TMeasure,
    prediction: any
  ) => {
    frontalMeasuresMap.forEach(({ name, points }) => {
      if (name === measure.name) {
        const begin = prediction[points.begin];
        const end = prediction[points.end];
        drawLine(begin, end, ctx);
        ctx.fillStyle = colors.primary;
        ctx.font = "16px Arial";
        ctx.fillText(`${measure.value}cm`, 10, 20);
      }
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      {predictions.map((prediction) => {
        const { cls, cli, af, ats, atm, ati, lf } = prediction;
        const measureArray = [cls, cli, af, ats, atm, ati, lf];
        return (
          <PredictionCarousel
            key={prediction._id}
            measureArray={measureArray}
            imgUrl={prediction.image.url}
            onDraw={(ctx, item) => {
              handleDraw(ctx, item, prediction);
            }}
          />
        );
      })}
    </>
  );
}
