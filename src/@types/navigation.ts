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
  ChangeTrPointScreen: undefined;
  FrontalMeasures: undefined;
  FrontalDistance: undefined;
  ProfileDetect: undefined;
  ProfileMeasures: undefined;
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
