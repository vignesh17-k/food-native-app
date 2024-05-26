import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { SIZES } from "../../constants";
import { HStack, Spinner } from "native-base";

interface Props {
  text: string;
  type: any;
  width?: any;
  onClick: () => any;
  loading?: boolean;
  style?: any;
}

const Button = ({ text, type, width, onClick, loading, style }: Props) => {
  const renderButton = () => {
    switch (type) {
      case "primary":
        return (
          <TouchableOpacity onPress={onClick}>
            <View
              style={{
                ...styles.primaryButton,
                ...style,
                width: width,
              }}
            >
              {loading ? (
                <HStack space={2} justifyContent="center">
                  <Spinner color="indigo.500" />
                  <Text style={styles.primaryButtonText}>{text}</Text>
                </HStack>
              ) : (
                <Text style={styles.primaryButtonText}>{text}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity onPress={onClick}>
            <View style={{ ...styles.secondaryButton, ...style, width: width }}>
              <Text style={styles.secondaryButtonText}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
    }
  };

  return <View>{renderButton()}</View>;
};

const styles = StyleSheet.create({
  secondaryButton: {
    borderRadius: 10,
    padding: SIZES.height * 0.02,
  },
  primaryButton: {
    backgroundColor: "rgb(237,117,80)",
    padding: SIZES.height * 0.015,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: Dimensions.get("window").width * 0.04,
    textAlign: "center",
  },
  secondaryButtonText: {
    color: "rgb(159,164,169)",
    fontWeight: "700",
    fontSize: Dimensions.get("window").width * 0.04,
    textAlign: "center",
  },
});

export default Button;
