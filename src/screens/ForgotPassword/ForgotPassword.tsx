/* eslint-disable no-unused-vars */
import { View, Image, Text, useToast } from "native-base";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../../constants";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import { supabase } from "../../../supabase.config";
import ImageLinks from "../../../assets/ImageLink";
import { useNavigation } from "@react-navigation/native";
import { makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ForgotPassword() {
  const [loading, set_loading] = useState(false);
  const toast = useToast();
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const redirect_to = makeRedirectUri();

  const store_data = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  const handle_send_reset_password = async (payload) => {
    set_loading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(payload, {
      redirectTo: `${redirect_to}resetPassword`,
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

    store_data("user_data", JSON.stringify({ email: payload }));
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
      <View style={styles.img_container}>
        <View style={{ width: "25%" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={ImageLinks?.back_arrow}
              style={{
                resizeMode: "contain",
                height: SIZES.height * 0.04,
              }}
              alt="logo"
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "75%" }}>
          <Image
            source={ImageLinks?.logo}
            style={{
              resizeMode: "contain",
              width: SIZES.width * 0.5,
              marginTop: 20,
              height: 100,
            }}
            alt="logo"
          />
        </View>
      </View>

      <View style={styles.container}>
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
    gap: 20,
    flex: 1,
  },
  img_container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.width * 0.02,
    marginBottom: 10,
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
