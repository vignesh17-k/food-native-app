import React from "react";
import { Text, View } from "react-native";

function Header({ container_style, left_section, right_section, title }) {
  return (
    <View
      style={{
        flexDirection: "row",
        ...container_style,
      }}
    >
      {left_section}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>{title}</Text>
      </View>
      {right_section}
    </View>
  );
}

export default Header;
