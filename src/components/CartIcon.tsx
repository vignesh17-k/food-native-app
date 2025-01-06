import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ImageLinks from "../../assets/ImageLink";
import { Badge } from "native-base";

const CartIcon = () => {
  return (
    <View style={styles.cart_icon}>
      <Badge
        bg="red.400"
        colorScheme="danger"
        rounded="full"
        mb={-4}
        mr={-3}
        zIndex={1}
        variant="solid"
        alignSelf="flex-end"
        _text={{
          fontSize: 12,
        }}
      >
        2
      </Badge>
      <Image source={ImageLinks.cart} alt="cart" style={styles.cart_image} />
    </View>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  cart_icon: {
    backgroundColor: "#ffdfd6",
    padding: 10,
    paddingTop: 2,
    borderRadius: 15,
  },
  cart_image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "black",
  },
});
