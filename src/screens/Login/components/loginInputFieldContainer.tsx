import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SIZES } from "../../../../constants";
import InputField from "../../../components/InputField";
import Password from "../../../components/Password";
import Button from "../../../components/Button";
import { Messages } from "../../../../utils/text";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginType, setLogin } from "../../../../store/slices/LoginSlice";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../../supabase.config";
import { useForm } from "react-hook-form";
import { useToast } from "native-base";

const loginInputFieldContainer = ({ navigation }) => {
  const [loading, set_loading] = useState(false);
  const navigate:any = useNavigation();
  const loginType = useSelector((state:any) => state.login.loginType);
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const toast = useToast();


  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;

    switch (loginType) {
      case "signup":
        set_loading(true);
        handle_create_new_user(email, password);
        break;
      case "login":
        set_loading(true);
        handle_existing_user(email, password);
        break;
    }
  });

  const handle_navigation = () => {
    dispatch(setLogin(true));
    set_loading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "home" }],
    });
  };

  const handle_create_new_user = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      set_loading(false);
      toast.show({
        title: error?.message,
        placement: "top",
      });
      return;
    }
    handle_navigation();
  };

  const handle_existing_user = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      set_loading(false);
      toast.show({
        title: error?.message,
        placement: "top",
      });
      return;
    }

    handle_navigation();
  };

  return (
    <View style={styles.text_field_container}>
      <InputField
        name="email"
        label="Email"
        validations={{
          required: true,
          email: true,
        }}
        style={{ marginBottom: SIZES.height * 0.001 }}
        control={control}
      />
      {loginType === "signup" && (
        <InputField
          name="username"
          label="Username"
          style={{ marginBottom: SIZES.height * 0.001 }}
          validations={{
            required: true,
            minLength: 3,
          }}
          control={control}
        />
      )}

      <Password
        name="password"
        style={{ marginBottom: SIZES.height * 0.001 }}
        label="Password"
        validations={{
          required: true,
          minLength: 6,
        }}
        control={control}
      />

      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        <Text
          style={styles.forgot_password_style}
          onPress={() => navigate.navigate("forgotPassword")}
        >
          Forgot Password?
        </Text>
      </View>

      <View style={styles.button_container}>
        <Button
          loading={loading}
          onClick={onSubmit}
          text={loginType === "signup" ? "Sign Up" : "Sign In"}
          type="primary"
          width={SIZES.width * 0.88}
        />
      </View>

      <Text style={styles.sub_text_style}>
        {loginType === "signup" ? (
          <React.Fragment>
            {Messages.signUpText}{" "}
            <Text
              onPress={() => dispatch(changeLoginType("login"))}
              style={styles.cta_text}
            >
              Sign In
            </Text>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {Messages.loginText}{" "}
            <Text
              onPress={() => dispatch(changeLoginType("signup"))}
              style={styles.cta_text}
            >
              Sign Up
            </Text>
          </React.Fragment>
        )}
      </Text>
    </View>
  );
};

export default loginInputFieldContainer;

const styles = StyleSheet.create({
  text_field_container: {
    marginHorizontal: SIZES.width * 0.06,
    marginVertical: SIZES.height * 0.03,
  },

  cta_text: {
    color: "rgb(237,117,80)",
    fontWeight: "800",
  },

  sub_text_style: {
    textAlign: "center",
    fontSize: SIZES.width * 0.04,
    color: "grey",
    marginVertical: SIZES.height * 0.01,
  },

  button_container: {
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: SIZES.height * 0.01,
  },

  forgot_password_style: {
    opacity: 0.3,
    marginTop: 5,
    fontSize: SIZES.width * 0.034,
  },
});
