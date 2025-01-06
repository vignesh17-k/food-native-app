import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  Text,
} from "react-native";
import { SIZES } from "../../../constants";
import ImageLinks from "../../../assets/ImageLink";
import { SafeAreaView } from "react-native-safe-area-context";
import mock_data from "../../../constants/dummyData";
import { FlatList } from "native-base";

const Search = ({ navigation }) => {
  const [search_value, set_search_value] = useState("");
  const search_ref: any = useRef();

  const text = {
    recent_search: "YOUR RECENT SEARCHES",
    searched_item: "WHAT`S ON YOUR MIND?",
  };

  const handle_change = (val: any) => {
    set_search_value(val);
  };

  // useEffect(() => {
  //   if (search_ref) {
  //     search_ref?.current.focus();
  //   }
  // }, [search_ref]);

  const handle_render_search = () => {
    return (
      <View style={styles.search_container}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Image
            source={ImageLinks?.back_arrow}
            style={{
              resizeMode: "contain",
              height: SIZES.height * 0.04,
            }}
            alt="logo"
          />
        </TouchableOpacity>
        <TextInput
          ref={search_ref}
          onChangeText={handle_change}
          value={search_value}
          placeholder="Search..."
          keyboardType="default"
        />
      </View>
    );
  };

  const handle_line_with_text = (title: string, style?: any) => {
    return (
      <View style={[styles.search_title, style]}>
        <View style={styles.line} />
        <Text style={styles.text}>{title}</Text>
        <View style={styles.line} />
      </View>
    );
  };

  const render_item = ({ item }) => {
    return (
      <View style={styles.gridItem}>
        <Image
          style={styles.image}
          key={item?.id}
          source={item?.image}
          alt="search_img"
        />
        <Text style={{ fontWeight: "700" }}>{item?.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ justifyContent: "center", marginHorizontal: 20 }}>
        {handle_render_search()}
        {/* {handle_line_with_text(text.recent_search)}
        <View style={{ gap: 10 }}>
          {map(constants?.most_searched_data, (item) => (
            <View style={styles.searched_line_item} key={item?.id}>
              <View style={styles.searched_line_item_img_container}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 12,
                  }}
                  key={item?.id}
                  source={item.image}
                  alt="search_img"
                />
                <Text>{item?.title}</Text>
              </View>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                key={item?.id}
                source={ImageLinks.cross}
                alt="search_img"
              />
            </View>
          ))}
        </View> */}
        {handle_line_with_text(text.searched_item)}
        <FlatList
          data={mock_data?.most_searched_data}
          renderItem={render_item}
          keyExtractor={(item) => item?.id}
          scrollEnabled={false}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          // contentContainerStyle={styles.grid}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: SIZES.height * 0.01,
    borderRadius: 16,
    width: "100%",
  },
  columnWrapper: {
    columnGap: 20,
  },
  search_title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  searched_line_item: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  searched_line_item_img_container: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  // grid: {
  // paddingHorizontal: 0,
  // paddingVertical: 0,
  // },
  gridItem: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    resizeMode: "contain",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0dcdc",
  },
  text: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});
