declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends NewStackParamList,
        RecordParamList,
        TabParamList {}
  }
}

export type TabParamList = {
  New: undefined;
  Record: undefined;
};

export type NewStackParamList = {
  Image: undefined;
  Layout: undefined;
  FrontalDetect: undefined;
  ChangeFrontalPointScreen: {
    pointsToChange: string[];
  };
  FrontalMesures: undefined;
  FrontalDistance: undefined;
  ProfileDetect: undefined;
  ChangeProfilePointScreen: {
    pointsToChange: string[];
  };
  ProfileMesures: undefined;
  ProfileMarkPoints: undefined;
};

export type RecordParamList = {
  AllParticipants: undefined;
  Participant: {
    _id: string;
  };
  FrontalPrediction: {
    participant_id: string;
  };
  ProfilePrediction: {
    participant_id: string;
  };
};
