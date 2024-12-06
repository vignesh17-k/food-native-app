import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../../constants";

const Container = ({ children, ...style }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ ...style, ...styles.content_container }}>{children}</View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  content_container: {
    marginHorizontal: SIZES.width * 0.03,
  },
});
