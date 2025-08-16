import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./src/constants/theme";
import { Routes } from "./src/routes";

const App: React.FunctionComponent<any> = () => {
  useEffect(() => {
    // Temporary polyfill for old libs
    // @ts-ignore
    if (!BackHandler.removeEventListener) {
      // @ts-ignore
      BackHandler.removeEventListener = () => {};
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <Routes />
        <StatusBar style="dark" />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
