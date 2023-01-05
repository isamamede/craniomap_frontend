declare global {
  namespace ReactNavigation {
    interface RootParamList extends NewStackParamList {}
  }
}

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
