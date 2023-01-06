import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../@types/navigation";
import { NewStack } from "./new.routes";
import { RecordStack } from "./records.routes";

const { Screen, Navigator } = createBottomTabNavigator<TabParamList>();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF002B",
        tabBarInactiveTintColor: "#B9B9B9",
      }}
      initialRouteName="Record"
    >
      <Screen
        name="Record"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="folder-o" color={color} />
          ),
        }}
        component={RecordStack}
      />
      <Screen
        name="New"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="picture-o" color={color} />
          ),
        }}
        component={NewStack}
      />
    </Navigator>
  );
}
