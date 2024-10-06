import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ImageLinks from "../../../../assets/ImageLink";
import { SIZES } from "../../../../constants";

const popular_items = [
  {
    id: "1",
    name: "Hamburger",
    description: "Chicken patty hamburger",
    price: "$15.99",
    calories: "78 Calories",
    image: ImageLinks.burger_menu,
  },
  {
    id: "2",
    name: "Hot Tacos",
    description: "Mexican tortilla & taco",
    price: "$10.99",
    calories: "78 Calories",
    image: ImageLinks.tacos_menu,
  },
];

const PopularRails = () => {
  return (
    <>
      <View style={styles.title_container}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          Popular Near You
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#ed7550",
          }}
        >
          Show All
        </Text>
      </View>
      <FlatList
        data={popular_items}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card_container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={ImageLinks.calories} style={styles.icon_style} />
              <Text style={styles.calories}>{item.calories}</Text>
            </View>

            <Image source={item.image} style={styles.card_image} />
            <View style={styles.card_content}>
              <Text style={styles.card_title}>{item.name}</Text>
              <Text style={styles.card_description}>{item.description}</Text>
              <Text style={styles.card_price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.popular_rail}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  popular_rail: {
    gap: 20,
  },
  card_container: {
    backgroundColor: "#f7f8fa",
    borderRadius: 20,
    padding: 20,
    minWidth: 220,
  },
  card_image: {
    width: "100%",
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: "contain",
  },
  card_content: {
    alignItems: "center",
  },
  calories: {
    fontSize: 14,
    color: "grey",
  },
  card_title: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 5,
  },
  card_description: {
    fontSize: 14,
    marginBottom: 20,
    color: "#888",
  },
  card_price: {
    fontSize: 20,
    fontWeight: "800",
  },
  icon_style: {
    resizeMode: "contain",
    height: SIZES.height * 0.03,
    width: SIZES.width * 0.03,
    paddingHorizontal: 15,
  },
});

export default PopularRails;
