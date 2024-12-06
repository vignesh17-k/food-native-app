import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import constants from "../../../../constants/dummyData";
import ImageLinks from "../../../../assets/ImageLink";
import { SIZES } from "../../../../constants";

const MenuRails = () => {
  const [selected_menu, set_selected_menu] = useState(constants?.menu[0]);

  const render_menu_tabs = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => set_selected_menu(item)}>
        <Text
          style={{
            color: item.id === selected_menu?.id ? "#FF6D00" : "#000",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const render_cards = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card_container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image source={ImageLinks.calories} style={styles.icon_style} />
            <Text style={styles.calories}>{item?.calories} Calories</Text>
          </View>
        </View>

        <Image source={item?.image} style={styles.card_image} />

        <View style={styles.card_content}>
          <Text style={styles.card_title}>{item?.name}</Text>
          <Text style={styles.card_description}>{item?.description}</Text>
          <Text style={styles.card_price}>${item?.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={constants?.menu}
        renderItem={render_menu_tabs}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.menu_list}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
      />

      <FlatList
        data={selected_menu?.list}
        renderItem={render_cards}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.popular_rail}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu_list: {
    gap: 24,
    marginBottom: 25,
  },
  popular_rail: {
    gap: 20,
  },
  card_container: {
    backgroundColor: "#f7f8fa",
    borderRadius: 20,
    padding: 20,
    minWidth: 220,
    marginBottom:20
  },
  card_image: {
    width: "100%",
    height: 150,
    borderRadius: 15,
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
    marginBottom: 5,
  },
  card_description: {
    fontSize: 14,
    marginBottom: 20,
    color: "#888",
  },
  card_price: {
    fontSize: 20,
    fontWeight: "900",
  },
  icon_style: {
    resizeMode: "contain",
    height: SIZES.height * 0.03,
    width: SIZES.width * 0.03,
    paddingHorizontal: 15,
  },
});

export default MenuRails;
