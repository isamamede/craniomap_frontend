import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { IProfileMeasures, IProfilePredictions } from "../@types/landmarks";
import getProfileMeasures from "../utils/functions/getProfileMeasures";

type TProfilePredictions = {
  profilePredictions: IProfilePredictions | null;
  setProfilePredictions: Dispatch<SetStateAction<IProfilePredictions | null>>;
  profileMeasures: IProfileMeasures | null;
};

interface IProps {
  children: React.ReactNode;
}

const ProfilePredictionsContext = createContext<TProfilePredictions>({
  profilePredictions: null,
  setProfilePredictions: () => {},
  profileMeasures: null,
});

const ProfilePredictionsProvider: React.FC<IProps> = ({ children }) => {
  const [profilePredictions, setProfilePredictions] =
    useState<IProfilePredictions | null>(null);

  const profileMeasures: IProfileMeasures | null = useMemo(
    () => (profilePredictions ? getProfileMeasures(profilePredictions) : null),
    [profilePredictions]
  );

  return (
    <ProfilePredictionsContext.Provider
      value={{ profilePredictions, setProfilePredictions, profileMeasures }}
    >
      {children}
    </ProfilePredictionsContext.Provider>
  );
};

function useProfilePredictions() {
  const context = useContext(ProfilePredictionsContext);
  if (context === undefined) {
    throw new Error(
      "useProfilePredictions must be used within a ProfilePredictionsProvider"
    );
  }
  return context;
}

export { ProfilePredictionsProvider, useProfilePredictions };
