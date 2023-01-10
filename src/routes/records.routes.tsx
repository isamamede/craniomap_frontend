import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecordParamList } from "../@types/navigation";
import AllParticipantsScreen from "../screens/Records/AllParticipantsScreen";
import FrontalPredictionScreen from "../screens/Records/FrontalPredictionScreen";
import ParticipantScreen from "../screens/Records/ParticipantScreen";
import ProfilePredictionScreen from "../screens/Records/ProfilePredictionScreen";

const { Screen, Navigator, Group } =
  createNativeStackNavigator<RecordParamList>();

export function RecordStack() {
  return (
    <Navigator>
      <Screen
        name="AllParticipants"
        options={{ headerShown: false }}
        component={AllParticipantsScreen}
      />
      <Screen name="Participant" component={ParticipantScreen} />
      <Screen name="FrontalPrediction" component={FrontalPredictionScreen} />
      <Screen name="ProfilePrediction" component={ProfilePredictionScreen} />
    </Navigator>
  );
}
