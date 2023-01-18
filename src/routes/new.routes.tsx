import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewStackParamList } from "../@types/navigation";
import { FrontalPredictionsProvider } from "../contexts/FrontalPredictionsContext";
import { ImageProvider } from "../contexts/ImageContext";
import { ProfilePredictionsProvider } from "../contexts/ProfilePredictionsContext";
import { ServerProvider } from "../contexts/Server";
import ChangeTrPointScreen from "../screens/NewPrediction/Frontal/ChangeTrPointScreen";
import FrontalDetectScreen from "../screens/NewPrediction/Frontal/FrontalDetectScreen";
import FrontalDistanceScreen from "../screens/NewPrediction/Frontal/FrontalDistanceScreen";
import FrontalMesureScreen from "../screens/NewPrediction/Frontal/FrontalMesuresScreen";
import ImageScreen from "../screens/NewPrediction/ImageScreen";
import LayoutScreen from "../screens/NewPrediction/LayoutScreen";
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
            <Navigator>
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
                name="ChangeTrPointScreen"
                component={ChangeTrPointScreen}
              />
              <Screen name="FrontalMesures" component={FrontalMesureScreen} />

              <Screen name="ProfileDetect" component={ProfileDetectScreen} />
              <Screen
                name="ProfileMarkPoints"
                component={ProfilePointsScreen}
              />
              <Screen name="ProfileMesures" component={ProfileMesuresScreen} />
            </Navigator>
          </ProfilePredictionsProvider>
        </FrontalPredictionsProvider>
      </ImageProvider>
    </ServerProvider>
  );
}
