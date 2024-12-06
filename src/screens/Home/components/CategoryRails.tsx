import React, { useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import constants from "../../../../constants/dummyData";
import _ from "lodash";

const CategoryRail = () => {
  const [active_category, set_active_category] = useState(_.head(constants?.categories)?.id);

  return (
    <FlatList
      data={constants.categories}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => set_active_category(item?.id)}
          style={[
            styles.categoryContainer,
            item.id === active_category && styles.activeCategoryContainer,
          ]}
        >
          <Image source={item.icon} style={styles.categoryIcon} />
          <Text  style={[styles.categoryText,    item.id === active_category && styles.activeCategoryText,]}>{item.name}</Text>
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
  activeCategoryContainer: {
    backgroundColor: "#ed7550",
  },
  activeCategoryText:{
   color:'white'
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
