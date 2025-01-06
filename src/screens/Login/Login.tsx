import React, { useEffect } from "react";
import LoginInputFieldContainer from "../Login/components/loginInputFieldContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image, Text, View, useToast } from "native-base";
import { SIZES } from "../../../constants";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import ImageLinks from "../../../assets/ImageLink";
import { supabase } from "../../../supabase.config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LogoHeader from "../../components/LogoHeader";
import { Messages } from "../../../utils/text";
import constants from "../../../utils/constants";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "256385423646-ce03he8h22l3vdi69okag85ivegav5h2.apps.googleusercontent.com",
    androidClientId:
      "256385423646-r4h33vvbsq7vfp3p4h628dt0ppt47ta3.apps.googleusercontent.com",
    webClientId:
      "256385423646-9i5235emvqtjbg012oq00724b28vbcmm.apps.googleusercontent.com",
  });
  const toast = useToast();
  const login_type = useSelector((state: any) => state?.login?.loginType);
  const navigate: any = useNavigation();

  const handle_signin_with_google = async (user_info: any) => {
    const params = user_info?.params;
    if (params?.id_token) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: params?.id_token,
      });

      if (error) {
        toast.show({
          title: error?.message,
          placement: "top",
          backgroundColor: "red.800",
        });
        return;
      }
    }
  };

  useEffect(() => {
    if (response) {
      handle_signin_with_google(response);
    }
  }, [response]);

  return (
      <SafeAreaView
        style={{ flex: 1, marginVertical: Platform.OS === "android" && 20 }}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <LogoHeader
              allow_back={false}
              title={
                login_type === "signup"
                  ? Messages.signUpTitle
                  : Messages.loginTitle
              }
              sub_title={
                login_type === "signup"
                  ? Messages.signUpSubTitle
                  : Messages.loginSubTitle
              }
            />
            <LoginInputFieldContainer navigation={navigation} />
          </ScrollView>
        </KeyboardAvoidingView>

        {login_type === "login" && (
          <TouchableOpacity onPress={() => navigate.navigate(constants.route_names.PhoneLogin)}>
            <View style={styles.phoneLogin}>
              <Text color="white">Login With Phone Number</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => promptAsync()}>
          <View style={{ ...styles.googleButton }}>
            <Image
              source={ImageLinks?.google_icon}
              alt="google_icon"
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text>Continue With Google</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 0.5,
    justifyContent: "center",
  },
  phoneLogin: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.8)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginHorizontal: SIZES.width * 0.05,
    marginBottom: 10,
  },
  googleButton: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "rgba(230,230,230,0.6)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginHorizontal: SIZES.width * 0.05,
  },
});

export default Login;
