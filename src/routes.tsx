import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./screens/OnBoarding/OnBoarding";
import Login from "./screens/Login/Login";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import PhoneLogin from "./screens/PhoneLogin/PhoneLogin";
import { useSelector } from "react-redux";
import Otp from "./screens/OtpScreen/Otp";
import TabBar from "./components/Tabs";
import constants from "../utils/constants";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const user_data = useSelector((state: any) => state?.user?.session);
  const { route_names } = constants;

  return (
    <Stack.Navigator
      initialRouteName={
        user_data?.session ? route_names.MainApp : route_names?.PreLogin
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={route_names?.PreLogin} component={OnBoarding} />
      <Stack.Screen
        name={route_names?.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen name={route_names?.Login} component={Login} />
      <Stack.Screen
        name={route_names?.ResetPassword}
        component={ResetPassword}
      />
      <Stack.Screen name={route_names?.PhoneLogin} component={PhoneLogin} />
      <Stack.Screen name={route_names?.OtpLogin} component={Otp} />
      <Stack.Screen name={route_names?.MainApp} component={TabBar} />
    </Stack.Navigator>
  );
};
8256;

export default Routes;
