import { useEffect } from "react";
import { Linking, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import * as QueryParams from "expo-auth-session/build/QueryParams";

const DeepLinkHandler = () => {
  const navigation:any = useNavigation();
  const toast = useToast();
  const linking: any = Linking

  const handle_deep_link = async (url: string) => {
    try {
      const { params } = QueryParams.getQueryParams(url);
      const { access_token } = params;
      if (access_token && url?.startsWith("eat-me-app://resetPassword")) {
        // navigate to the resetPassword screen
        navigation.navigate("resetPassword");
      } else {
        toast.show({
          title: "Invalid access token",
          placement: "top",
          backgroundColor: "red.800",
        });
      }
    } catch {
      toast.show({
        title: "invalid access token",
        placement: "top",
        backgroundColor: "red.800",
      });
    }
  };

  const get_initial_urL = async () => {
    const initial_url = await linking.getInitialURL();
    return initial_url;
  };

  const handle_open_url = ({ url }) => {
    url && handle_deep_link(url);
  };

  useEffect(() => {
    // Add event listeners for deep linking
    if (Platform.OS === "android") {
      get_initial_urL()
        .then((url) => {
          if (url) {
            handle_deep_link(url);
          }
        })
        .catch((err) => {
          toast.show({
            title: err,
            placement: "top",
            backgroundColor: "red.800",
          });
        });
      linking.addEventListener("url", handle_open_url);
    } else {
      linking.addEventListener("url", handle_open_url);
    }

    return () => {
      // Clean up event listeners
      linking.removeEventListener("url", handle_open_url);
    };
  }, []);

  return null;
};

export default DeepLinkHandler;
