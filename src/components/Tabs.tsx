import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import constants from "../../utils/constants";
import _ from "lodash";
import Home from "../screens/Home/Home";
import React, { useEffect, useRef, useState } from "react";
import { SIZES } from "../../constants";

const Tab = createBottomTabNavigator();

const TabView = () => {
  const [active_tab, set_active_tab] = useState(0);
  const animated_value = useRef(new Animated.Value(0))?.current;

  useEffect(() => {
    Animated.timing(animated_value, {
      toValue: active_tab,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [active_tab]);

  const handle_navigate = (id: number) => {
    set_active_tab(id);
  };

  const handle_render_tabs = (tab: any, index: number) => {
    const is_active = active_tab === tab?.id;

    const scale = animated_value.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [1, 1.1, 1],
      extrapolate: "clamp",
    });
    const backgroundColor = is_active ? "rgb(237,117,80)" : "transparent";

    return (
      <TouchableOpacity onPress={() => handle_navigate(tab?.id)} key={tab?.id}>
        <Animated.View
          style={[
            is_active ? styles?.active_tab_item : styles?.tab_item,
            {
              backgroundColor,
              transform: [{ scale }],
            },
          ]}
        >
          <Image
            source={tab?.icon}
            style={{
              ...styles.icon_style,
              tintColor: is_active ? "white" : "grey",
            }}
          />
          {is_active && <Text style={styles.text_style}>{tab?.label}</Text>}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.tab_container}>
        {_.map(constants.bottomTabs, (tab, index) => {
          return (
            <React.Fragment key={tab?.id}>
              {handle_render_tabs(tab, index)}
            </React.Fragment>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={constants.RouteNames.Home}
      tabBar={() => <TabView />}
    >
      <Tab.Screen name="home" component={Home} />
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tab_container: {
    flexDirection: "row",
    height: SIZES.height * 0.1,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 15,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: -15,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  tab_item: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  icon_style: {
    height: 20,
    width: 20,
  },
  active_tab_item: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgb(237,117,80)",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  text_style: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
});
