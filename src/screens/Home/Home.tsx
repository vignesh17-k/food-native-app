import React from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { SIZES } from "../../../constants";
import ImageLinks from "../../../assets/ImageLink";
import { FlatList, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { supabase } from "../../../supabase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogin } from "../../../store/slices/LoginSlice";
import constants from "../../../utils/constants";
import Button from "../../components/Button";
import CategoryRail from "./components/CategoryRails";
import PopularRails from "./components/PopularRails";
import RecommendedRails from "./components/RecommendedRails";

const Home = ({ navigation }) => {
  const navigate: any = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const handle_logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.show({
        title: error?.message,
        placement: "top",
      });
      return;
    }

    AsyncStorage.clear();
    dispatch(setLogin(false));
    navigate.navigate(constants.RouteNames.Login);
    navigation.reset({
      index: 0,
      routes: [{ name: constants.RouteNames.Login }],
    });
  };

  const handle_render_header = () => {
    return (
      <Header
        title={<Text style={{ fontSize: 20, fontWeight: "700" }}>HOME</Text>}
        right_section={
          <View
            style={{
              padding: 10,
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 10,
              opacity: 0.8,
            }}
          >
            <Image
              source={ImageLinks.settings}
              alt="search"
              style={{
                height: 25,
                width: 25,
                tintColor: "grey",
              }}
            />
          </View>
        }
        left_section={
          <Image
            source={ImageLinks.profile}
            alt="search"
            style={{ height: 45, width: 45, borderRadius: 10 }}
          />
        }
        container_style={{
          marginVertical: 10,
        }}
      />
    );
  };

  const handle_render_deliver_section = () => {
    return (
      <View style={styles.deliver_to_section}>
        <Text style={styles.deliver_text}>DELIVERY TO</Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.deliver_address}
          >
            No. 88, Jln Padungan, Kuching
          </Text>
          <Image source={ImageLinks?.down_arrow} style={styles.icon_style} />
        </View>
      </View>
    );
  };

  const handle_render_content_section = () => {
    return (
      <FlatList
        data={[
          {
            section: "category",
          },
          {
            section: "popular",
          },
          // {
          //   section: "recommended",
          // },
        ]}
        contentContainerStyle={{
          gap: 20,
        }}
        renderItem={({ item }) => {
          switch (item?.section) {
            case "category":
              return <CategoryRail />;
            case "popular":
              return <PopularRails />;
            case "recommended":
              return <RecommendedRails />;
          }
        }}
      />
    );
  };

  const handle_render_search = () => {
    return (
      <View style={styles.search_container}>
        <Image
          source={ImageLinks.search}
          alt="search"
          style={{ height: 25, width: 25, tintColor: "black" }}
        />
        <Pressable>
          <Text style={styles.placeholder_text}>{"search food..."}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Container>
      {handle_render_header()}
      {handle_render_search()}
      {handle_render_deliver_section()}
      {handle_render_content_section()}
      {/* <Button type="primary" text={"logout"} onClick={handle_logout} /> */}
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  search_container: {
    backgroundColor: "#f5f5f5",
    padding: SIZES.height * 0.015,
    borderRadius: 16,
    marginTop: 10,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  placeholder_text: {
    color: "#bdbdc1",
    fontSize: 18,
    fontWeight: "500",
  },
  deliver_to_section: {
    marginVertical: SIZES.height * 0.028,
    gap: 10,
  },
  deliver_text: {
    color: "#ed7550",
    fontSize: 18,
  },
  deliver_address: {
    fontSize: 18,
    fontWeight: "700",
    maxWidth: 300,
  },
  icon_style: {
    resizeMode: "contain",
    height: SIZES.height * 0.02,
    width: SIZES.width * 0.02,
    paddingHorizontal: 15,
  },
});
