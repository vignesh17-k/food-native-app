import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./screens/OnBoarding/OnBoarding";
import Login from "./screens/Login/Login";
import Home from "./screens//Home/Home";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import PhoneLogin from "./screens/PhoneLogin/PhoneLogin";
import { useSelector } from "react-redux";
import Otp from "./screens/OtpScreen/Otp";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const user_data = useSelector((state: any) => state?.user?.session);

  return (
    <Stack.Navigator
      initialRouteName={user_data?.session ? "home" : "onBoarding"}
    >
      <Stack.Screen
        name={"onBoarding"}
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="phoneLogin"
        component={PhoneLogin}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="otpScreen"
        component={Otp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
