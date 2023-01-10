import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { CanvasRenderingContext2D } from "react-native-canvas";
import { TProfilePredictions } from "../../@types/database";
import { TMeasure } from "../../@types/landmarks";
import { RecordParamList } from "../../@types/navigation";
import Loading from "../../components/Loading";
import PredictionCarousel from "../../components/PredictionsCarousel";
import { colors } from "../../constants/colors";
import { tablesNames } from "../../constants/database";
import { profileMeasuresMap } from "../../constants/measures";
import { getRealm } from "../../databases/realm";
import drawAngle from "../../utils/functions/drawAngle";

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

  const handleDraw = async (
    ctx: CanvasRenderingContext2D,
    measure: TMeasure,
    prediction: any
  ) => {
    profileMeasuresMap.forEach(({ name, points }) => {
      if (name === measure.name) {
        const begin = prediction[points.begin];
        const center = prediction[points.center];
        const end = prediction[points.end];
        drawAngle(begin, center, end, ctx);
        ctx.fillStyle = colors.primary;
        ctx.font = "16px Arial";
        ctx.fillText(`${measure.value}\u00b0`, 10, 20);
      }
    });
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      {predictions.map((prediction) => {
        const { acf, acm, anl, sml } = prediction;
        const measureArray = [acf, acm, anl, sml];
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
