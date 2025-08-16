import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { IProfileMesures, IProfilePredictions } from "../@types/landmarks";
import getProfileMesures from "../utils/math/getProfileMesures";

type TProfilePredictions = {
  profilePredictions: IProfilePredictions | null;
  setProfilePredictions: Dispatch<SetStateAction<IProfilePredictions | null>>;
  profileMesures: IProfileMesures | null;
};

interface IProps {
  children: React.ReactNode;
}

const ProfilePredictionsContext = createContext<TProfilePredictions>({
  profilePredictions: null,
  setProfilePredictions: () => {},
  profileMesures: null,
});

const ProfilePredictionsProvider: React.FC<IProps> = ({ children }) => {
  const [profilePredictions, setProfilePredictions] =
    useState<IProfilePredictions | null>(null);

  const profileMesures: IProfileMesures | null = useMemo(
    () => (profilePredictions ? getProfileMesures(profilePredictions) : null),
    [profilePredictions]
  );

  return (
    <ProfilePredictionsContext.Provider
      value={{ profilePredictions, setProfilePredictions, profileMesures }}
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
