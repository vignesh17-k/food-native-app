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
  const { RouteNames } = constants;

  return (
    <Stack.Navigator
      initialRouteName={
        user_data?.session ? RouteNames.MainApp : RouteNames?.PreLogin
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={RouteNames?.PreLogin} component={OnBoarding} />
      <Stack.Screen
        name={RouteNames?.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen name={RouteNames?.Login} component={Login} />
      <Stack.Screen
        name={RouteNames?.ResetPassword}
        component={ResetPassword}
      />
      <Stack.Screen name={RouteNames?.PhoneLogin} component={PhoneLogin} />
      <Stack.Screen name={RouteNames?.OtpLogin} component={Otp} />
      <Stack.Screen name={RouteNames?.MainApp} component={TabBar} />
    </Stack.Navigator>
  );
};
8256;

export default Routes;
