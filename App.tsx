import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { NativeBaseProvider, useToast } from "native-base";
import MainApp from "./src/main";
import { NavigationContainer } from "@react-navigation/native";
import * as Updates from "expo-updates";
import DeepLinkHandler from "./src/components/DeepLinking";

export default function App() {
  const toast = useToast();

  async function on_fetch_update_async() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      toast.show({
        title: `Error fetching latest Expo update: ${error}`,
        placement: "top",
      });
    }
  }

  useEffect(() => {
    on_fetch_update_async();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainApp />
          <DeepLinkHandler />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
