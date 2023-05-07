import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  IFrontalMesures,
  IFrontalPredictions,
  TPoint,
} from "../@types/landmarks";
import { getDistance } from "../utils/math/getDistance";
import getFrontalMesures from "../utils/math/getFrontalMesures";

type TPoints = { point1: TPoint; point2: TPoint };

type TFrontalPredictions = {
  frontalPredictions: IFrontalPredictions | null;
  setFrontalPredictions: Dispatch<SetStateAction<IFrontalPredictions | null>>;
  frontalMesures: IFrontalMesures | null;
  setFrontalMeasures: () => void;
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
  frontalMesures: null,
  setFrontalMeasures: () => {},
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
  const [frontalMesures, setFMeasures] = useState<IFrontalMesures | null>(null);

  const valueInPx: number = useMemo(
    () =>
      distancePoints
        ? getDistance(distancePoints.point1, distancePoints.point2)
        : 0,
    [distancePoints]
  );

  function setFrontalMeasures() {
    const measures = frontalPredictions
      ? getFrontalMesures(frontalPredictions, valueInCm, valueInPx)
      : null;

    return setFMeasures(measures);
  }

  return (
    <FrontalPredictionsContext.Provider
      value={{
        frontalPredictions,
        setFrontalPredictions,
        frontalMesures,
        setFrontalMeasures,
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
