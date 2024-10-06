import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import ImageLinks from "../../../../assets/ImageLink";

const categories = [
  { id: "1", name: "Fast Food", icon: ImageLinks.burger },
  { id: "2", name: "Fruit Item", icon: ImageLinks.cherry },
];

const CategoryRail = () => {
  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.categoryContainer}>
          <Image source={item.icon} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.categoryRail}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  categoryRail: {
    gap: 20,
  },
  categoryContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#f7f8fa",
    borderRadius: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "700",
    paddingEnd: 10,
  },
});

export default CategoryRail;
