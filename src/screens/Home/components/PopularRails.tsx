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
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { update_section_data } from "../../../../store/slices/HomeSlice";

const PopularRails = ({ rail_data }: any) => {
  const dispatch = useDispatch();

  const _rail_data = rail_data?.slice(0, 10);


  const handle_favorite = (id: any, value: boolean) => {
    const data = _rail_data?.map((item:any) =>
      item?.id === id ? { ...item, isFavorite: value } : { ...item }
    );
    dispatch(
      update_section_data({ section_name: "popular", section_data: data })
    );
  };

  const render_cards = (item: any) => {
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

          <TouchableOpacity
            onPress={() => handle_favorite(item?.id, !item?.isFavorite)}
          >
            <FontAwesome
              name={item?.isFavorite ? "heart" : "heart-o"}
              size={20}
              color={item?.isFavorite ? "#ff6e4d" : "grey"}
            />
          </TouchableOpacity>
        </View>

        <Image
          source={item?.image}
          style={item?.style ? item?.style : styles.card_image}
        />

        <View style={styles.card_content}>
          <Text style={styles.card_title}>{item?.name}</Text>
          <Text style={styles.card_description}>{item?.description}</Text>
          <Text style={styles.card_price}>${item?.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
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
        data={_rail_data}
        horizontal
        keyExtractor={(item: any) => item?.id}
        renderItem={({ item }) => render_cards(item)}
        contentContainerStyle={styles.popular_rail}
        showsHorizontalScrollIndicator={false}
      />
    </React.Fragment>
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
    maxWidth: 220,
    justifyContent: "space-between",
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
    textAlign: "center",
  },
  card_description: {
    fontSize: 14,
    marginBottom: 20,
    color: "#888",
    textAlign: "center",
    minHeight: 30,
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

export default PopularRails;
