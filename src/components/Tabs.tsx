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
import { useEffect, useRef, useState } from "react";

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tab_container}>
        {_.map(constants.bottomTabs, (tab, index) => {
          const is_active = active_tab === tab?.id;

          const scale = animated_value.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [1, 1.1, 1],
            extrapolate: "clamp",
          });
          const backgroundColor = is_active ? "rgb(237,117,80)" : "transparent";

          return (
            <TouchableOpacity
              onPress={() => set_active_tab(tab?.id)}
              key={tab?.id}
            >
              <Animated.View
                style={[
                  is_active ? styles?.active_tab_item : styles?.tab_item,
                  {
                    backgroundColor,
                    transform: [{ scale  }],
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
                {is_active && (
                  <Text style={styles.text_style}>{tab?.label}</Text>
                )}
              </Animated.View>
            </TouchableOpacity>
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
  container: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  tab_container: {
    flexDirection: "row",
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 15,
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
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
});
