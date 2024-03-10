/* eslint-disable no-unused-vars */
import { View, Image, Text, useToast } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../constants";
import logo from "../../../assets/images/logo_02.png";
import { Platform, StyleSheet } from "react-native";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabase.config";

function ForgotPassword() {
  const [loading, set_loading] = useState(false);
  const toast = useToast();
  const { control, handleSubmit } = useForm();

  const handle_send_reset_password = async (payload) => {
    set_loading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(payload, {
      redirectTo: "",
    });
    set_loading(false);
    if (error) {
      toast.show({
        title: error?.message,
        placement: "top",
        backgroundColor: "red.800",
      });
      return;
    }

    toast.show({
      title: "Email sent",
      placement: "top",
      backgroundColor: "green.800",
    });
  };

  const onSubmit = handleSubmit((data) => {
    const { email } = data;
    handle_send_reset_password(email);
  });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={styles.container} bg={'red'}>
        <Image
          source={logo}
          style={{
            resizeMode: "contain",
            width: SIZES.width * 0.5,
            marginTop: 20,
            height: 100,
          }}
          alt="logo"
        />

        <View>
          <Text style={styles.title}>Password Recovery</Text>
          <Text style={styles.text}>
            Please enter your email address to recover your password
          </Text>
        </View>

        <View style={styles.textContainer}>
          <InputField
            name="email"
            label="Email"
            validations={{
              required: true,
              email: true,
            }}
            control={control}
          />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          marginVertical: Platform.OS === "android" && 20,
        }}
      >
        <Button
          text={"Send Mail"}
          onClick={onSubmit}
          loading={loading}
          type="primary"
          width={SIZES.width * 0.88}
        />
      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
    marginVertical: SIZES.height * 0.008,
  },
  text: {
    fontSize: 18,
    marginHorizontal: SIZES.width * 0.1,
    lineHeight: 30,
    textAlign: "center",
    color: COLORS.darkGray,
  },
  textContainer: {
    width: "90%",
  },
});
