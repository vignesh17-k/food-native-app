import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, SafeAreaView, Text } from "react-native";
import constants from "../../utils/constants";
import _ from "lodash";
import Home from "../screens/Home/Home";

const Tab = createBottomTabNavigator();

const TabView = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        {_.map(constants.bottomTabs, (tab) => (
          <View key={tab?.id}>
            <Text>{tab?.label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="home"
      tabBar={() => <TabView />}
    >
      <Tab.Screen name="home" component={Home} />
    </Tab.Navigator>
  );
};

export default TabBar;
