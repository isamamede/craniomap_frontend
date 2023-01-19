import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./src/constants/theme";
import { Routes } from "./src/routes";
import { WithSplashScreen } from "./src/screens/WithSplashScreen";

export default function App() {
  return (
    <WithSplashScreen>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <Routes />
          <StatusBar style="dark" />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </WithSplashScreen>
  );
}
