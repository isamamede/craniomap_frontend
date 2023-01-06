import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  IFrontalMeasures,
  IFrontalPredictions,
  TPoint,
} from "../@types/landmarks";
import { getDistance } from "../utils/functions/getDistance";
import getFrontalMeasures from "../utils/functions/getFrontalMeasures";

type TPoints = { point1: TPoint; point2: TPoint };

type TFrontalPredictions = {
  frontalPredictions: IFrontalPredictions | null;
  setFrontalPredictions: Dispatch<SetStateAction<IFrontalPredictions | null>>;
  frontalMeasures: IFrontalMeasures | null;
  distancePoints: TPoints | null;
  setDistancePoints: Dispatch<SetStateAction<TPoints | null>>;
  setValueInCM: Dispatch<SetStateAction<number>>;
  valueInCm: number;
  valueInPx: number;
};

interface Props {
  children: React.ReactNode;
}

const FrontalPredictionsContext = createContext<TFrontalPredictions>({
  frontalPredictions: null,
  setFrontalPredictions: () => {},
  frontalMeasures: null,
  distancePoints: null,
  setDistancePoints: () => {},
  valueInCm: 0,
  valueInPx: 0,
  setValueInCM: () => {},
});

const FrontalPredictionsProvider: React.FC<Props> = ({ children }) => {
  const [frontalPredictions, setFrontalPredictions] =
    useState<IFrontalPredictions | null>(null);
  const [distancePoints, setDistancePoints] = useState<TPoints | null>(null);
  const [valueInCm, setValueInCM] = useState<number>(0);

  const valueInPx: number = useMemo(
    () =>
      distancePoints
        ? getDistance(distancePoints.point1, distancePoints.point2)
        : 0,
    [distancePoints]
  );

  const frontalMeasures: IFrontalMeasures | null = useMemo(() => {
    return frontalPredictions
      ? getFrontalMeasures(frontalPredictions, valueInCm, valueInPx)
      : null;
  }, [frontalPredictions, valueInCm, valueInPx]);

  return (
    <FrontalPredictionsContext.Provider
      value={{
        frontalPredictions,
        setFrontalPredictions,
        frontalMeasures,
        distancePoints,
        setDistancePoints,
        setValueInCM,
        valueInCm,
        valueInPx,
      }}
    >
      {children}
    </FrontalPredictionsContext.Provider>
  );
};

function useFrontalPredictions() {
  const context = useContext(FrontalPredictionsContext);
  if (context === undefined) {
    throw new Error(
      "useFrontalPredictions must be used within a FrontalPredictionsProvider"
    );
  }
  return context;
}

export { FrontalPredictionsProvider, useFrontalPredictions };
