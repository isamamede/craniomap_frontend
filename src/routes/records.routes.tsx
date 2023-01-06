import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecordParamList } from "../@types/navigation";
import AllParticipantsScreen from "../screens/Records/AllParticipantsScreen";

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
    </Navigator>
  );
}
