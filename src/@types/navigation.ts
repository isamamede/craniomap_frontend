declare global {
  namespace ReactNavigation {
    interface RootParamList extends NewStackParamList {}
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
  FrontalMeasures: undefined;
  FrontalDistance: undefined;
  ProfileDetect: undefined;
  ProfileMeasures: undefined;
  ProfileMarkPoints: undefined;
};

export type RecordParamList = {
  AllParticipants: undefined;
  Participant: undefined;
  FrontalPrediction: undefined;
  ProfilePrediction: undefined;
};
