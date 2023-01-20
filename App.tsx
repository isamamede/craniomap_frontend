import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./src/constants/theme";
import useCachedResources from "./src/hooks/useCachedResources";
import { Routes } from "./src/routes";

export default function App() {
  const isAppReady = useCachedResources();

  return !isAppReady ? null : (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <Routes />
        <StatusBar style="dark" />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
