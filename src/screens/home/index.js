import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { setLogin } from "../../../store/slices/LoginSlice";
import { useDispatch } from "react-redux";
import { supabase } from "../../../supabase.config";
import { useToast } from "native-base";

const Home = ({ navigation }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const handle_logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.show({
        title: error?.message,
        placement: "top",
      });
      return;
    }

    AsyncStorage.clear();
    dispatch(setLogin(false));
    navigate.navigate("login");
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Text>Home Page</Text>
      <Button
        text="Logout"
        width={200}
        type="primary"
        onClick={handle_logout}
      ></Button>
    </SafeAreaView>
  );
};

export default Home;
