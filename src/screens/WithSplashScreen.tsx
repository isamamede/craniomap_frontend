import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";

export function WithSplashScreen({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Splash />
    </>
  );
}

export const Splash = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  if (hidden === true) return null;

  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      <LottieView
        source={require("../assets/images/splash.json")}
        autoPlay
        loop={false}
        speed={1}
        onAnimationFinish={async () => {
          try {
            // Load fonts
            await Font.loadAsync({
              ...FontAwesome.font,
              "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
            });
          } catch (e) {
            console.warn(e);
          } finally {
            setHidden(true);
          }
        }}
      />
    </View>
  );
};
