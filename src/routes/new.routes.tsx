import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SaveScreen from "screens/NewPrediction/SaveScreen";
import { NewStackParamList } from "../@types/navigation";
import { FrontalPredictionsProvider } from "../contexts/FrontalPredictionsContext";
import { ImageProvider } from "../contexts/ImageContext";
import { ProfilePredictionsProvider } from "../contexts/ProfilePredictionsContext";
import { ServerProvider } from "../contexts/Server";
import ChangeFrontalPointScreen from "../screens/NewPrediction/Frontal/ChangeFrontalPointScreen";
import FrontalDetectScreen from "../screens/NewPrediction/Frontal/FrontalDetectScreen";
import FrontalDistanceScreen from "../screens/NewPrediction/Frontal/FrontalDistanceScreen";
import FrontalMesureScreen from "../screens/NewPrediction/Frontal/FrontalMesuresScreen";
import ImageScreen from "../screens/NewPrediction/ImageScreen";
import LayoutScreen from "../screens/NewPrediction/LayoutScreen";
import ChangeProfilePointScreen from "../screens/NewPrediction/Profile/ChangeProfilePointScreen";
import ProfileDetectScreen from "../screens/NewPrediction/Profile/ProfileDetectScreen";
import ProfileMesuresScreen from "../screens/NewPrediction/Profile/ProfileMesuresScreen";
import ProfilePointsScreen from "../screens/NewPrediction/Profile/ProfilePointsScreen";

const { Screen, Navigator } = createNativeStackNavigator<NewStackParamList>();

export function NewStack() {
  return (
    <ServerProvider>
      <ImageProvider>
        <FrontalPredictionsProvider>
          <ProfilePredictionsProvider>
            <Navigator screenOptions={{ headerShown: false }}>
              <Screen
                name="Image"
                options={{ headerShown: false }}
                component={ImageScreen}
              />
              <Screen name="Layout" component={LayoutScreen} />

              <Screen name="FrontalDetect" component={FrontalDetectScreen} />
              <Screen
                name="FrontalDistance"
                component={FrontalDistanceScreen}
              />
              <Screen
                name="ChangeFrontalPointScreen"
                component={ChangeFrontalPointScreen}
              />
              <Screen name="FrontalMesures" component={FrontalMesureScreen} />

              <Screen name="ProfileDetect" component={ProfileDetectScreen} />
              <Screen
                name="ChangeProfilePointScreen"
                component={ChangeProfilePointScreen}
              />
              <Screen
                name="ProfileMarkPoints"
                component={ProfilePointsScreen}
              />
              <Screen name="ProfileMesures" component={ProfileMesuresScreen} />
              <Screen name="Save" component={SaveScreen as any} />
            </Navigator>
          </ProfilePredictionsProvider>
        </FrontalPredictionsProvider>
      </ImageProvider>
    </ServerProvider>
  );
}
