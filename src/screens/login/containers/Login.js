/* eslint-disable no-unused-vars */
import React from "react";
import LoginContainer from "../presentational/loginContainer";
import LoginInputFieldContainer from "../presentational/loginInputFieldContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image, Text, View } from "native-base";
import google_icon from "../../../../assets/icons/google.png";
import { SIZES } from "../../../../constants";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";


WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [request, response, promptAysnc] = Google.useAuthRequest({
    iosClientId:
      "838737370974-07cp7i8hl7c44fm4dpmke8ufmc2bd72o.apps.googleusercontent.com",
    webClientId:
      "838737370974-5q6c3e184jr0m035a98l3cv2896jq6o7.apps.googleusercontent.com",
    androidClientId:
      "838737370974-3g2r3ghdas0minefh3ggq3r87blb1m78.apps.googleusercontent.com",
  });

  return (
    <React.Fragment>
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
            <LoginContainer />
            <LoginInputFieldContainer navigation={navigation} />
          </ScrollView>
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={() => promptAysnc()}>
          <View style={{ ...styles.googleButton }}>
            <Image
              source={google_icon}
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
    </React.Fragment>
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
