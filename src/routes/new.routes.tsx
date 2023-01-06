import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewStackParamList } from "../@types/navigation";
import { FrontalPredictionsProvider } from "../contexts/FrontalPredictionsContext";
import { ImageProvider } from "../contexts/ImageContext";
import { ProfilePredictionsProvider } from "../contexts/ProfilePredictionsContext";
import FrontalDetectScreen from "../screens/NewPrediction/Frontal/FrontalDetectScreen";
import FrontalDistanceScreen from "../screens/NewPrediction/Frontal/FrontalDistanceScreen";
import FrontalMeasureScreen from "../screens/NewPrediction/Frontal/FrontalMeasuresScreen";
import ImageScreen from "../screens/NewPrediction/ImageScreen";
import LayoutScreen from "../screens/NewPrediction/LayoutScreen";
import ProfileDetectScreen from "../screens/NewPrediction/Profile/ProfileDetectScreen";
import ProfileMeasuresScreen from "../screens/NewPrediction/Profile/ProfileMeasuresScreen";
import ProfilePointsScreen from "../screens/NewPrediction/Profile/ProfilePointsScreen";

const { Screen, Navigator } = createNativeStackNavigator<NewStackParamList>();

export function NewStack() {
  return (
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
            <Screen name="FrontalDistance" component={FrontalDistanceScreen} />
            <Screen name="FrontalMeasures" component={FrontalMeasureScreen} />

            <Screen name="ProfileDetect" component={ProfileDetectScreen} />
            <Screen name="ProfileMarkPoints" component={ProfilePointsScreen} />
            <Screen name="ProfileMeasures" component={ProfileMeasuresScreen} />
          </Navigator>
        </ProfilePredictionsProvider>
      </FrontalPredictionsProvider>
    </ImageProvider>
  );
}
