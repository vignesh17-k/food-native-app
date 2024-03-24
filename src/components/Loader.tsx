import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

const Loader = () => {
  return (
    <Modal visible={true} transparent>
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="rgb(237,117,80)" />
      </View>
    </Modal>
  );
};

export default Loader;
