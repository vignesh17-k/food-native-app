import React, { useEffect, useRef } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import { SIZES } from "../../../constants";
import ImageLinks from "../../../assets/ImageLink";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CategoryRail from "./components/CategoryRails";
import PopularRails from "./components/PopularRails";
import RecommendedRails from "./components/RecommendedRails";
import _ from "lodash";
import constants from "../../../utils/constants";
import MenuRails from "./components/MenuRails";
import { useToast } from "native-base";
import { supabase } from "../../../supabase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLogin } from "../../../store/slices/LoginSlice";
import { set_section_data } from "../../../store/slices/HomeSlice";
import mock_data from "../../../constants/dummyData";
import { store } from "../../../store/store";

const Home = ({ navigation }) => {
  const section_data = useSelector((state: any) => state?.home?.section_data);
  const navigate: any = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const scrollY = useRef(new Animated.Value(0)).current;
  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: "clamp",
  });

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
    navigate.navigate(constants.route_names.Login);
    store.dispatch({ type: "USER_LOGOUT" });
    navigation.reset({
      index: 0,
      routes: [{ name: constants.route_names.Login }],
    });
  };

  const handle_render_header = () => {
    return (
      <Animated.View
        style={[
          { opacity: opacityTitle },
          ,
          { transform: [{ translateY: translateTitle }] },
        ]}
      >
        <Header
          title={<Text style={{ fontSize: 20, fontWeight: "700" }}>HOME</Text>}
          right_section={
            <View
              style={{
                padding: 10,
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 10,
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
            <TouchableOpacity onPress={handle_logout}>
              <Image
                source={ImageLinks.profile}
                alt="search"
                style={{ height: 45, width: 45, borderRadius: 10 }}
              />
            </TouchableOpacity>
          }
          container_style={{
            marginVertical: 10,
          }}
        />
      </Animated.View>
    );
  };

  const handle_click = () => {
    navigate.navigate(constants.route_names.Search);
  };

  const handle_render_search = () => {
    return (
      <TouchableOpacity onPress={handle_click}>
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
      </TouchableOpacity>
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
            {mock_data?.my_profile?.address}
          </Text>
          <Image source={ImageLinks?.down_arrow} style={styles.icon_style} />
        </View>
      </View>
    );
  };

  const render_section = ({ item }) => {
    switch (item.section) {
      case "delivery":
        return handle_render_deliver_section();
      case "category":
        return <CategoryRail rail_data={item?.data} />;
      case "popular":
        return <PopularRails rail_data={item?.data} />;
      case "recommended":
        return <RecommendedRails />;
      case "menu":
        return <MenuRails rail_data={item?.data} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(set_section_data(constants.sections));
  }, []);


  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: translateHeader }] },
        ]}
      >
        {handle_render_header()}
        {handle_render_search()}
      </Animated.View>
      <Animated.FlatList
        data={section_data}
        renderItem={render_section}
        keyExtractor={(item) => item?.section}
        contentContainerStyle={styles?.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={1}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 215,
    backgroundColor: "#fff",
    gap: 20,
    paddingBottom: 24,
  },
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 200,
    alignItems: "stretch",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
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
