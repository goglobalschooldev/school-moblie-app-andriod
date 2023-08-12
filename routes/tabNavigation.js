import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, View } from "react-native";
import DashboardStack from "../routes/stack/dashboardStack";
import TaskStack from "../routes/stack/taskStack";
import EventsStack from "../routes/stack/eventStack";
import ProfileStack from "../routes/stack/profileStack";
import TransportationStack from "./stack/transportationStack";

const Tab = createBottomTabNavigator();
const TabNavigation = ({ navigation }) => {
  React.useEffect(() => {}, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="DashboardStack"
      activeColor="#3C6EFB"
      inactiveColor="#9AA3A6"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 55,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Image
                  source={require("../assets/Images/apps.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/apps-silver.png")}
                  style={{ width: 23, height: 23 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TaskStack"
        component={TaskStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Image
                  source={require("../assets/Images/graduation-cap.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/graduation-cap_silver.png")}
                  style={{ width: 23, height: 23 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TransportationStack"
        component={TransportationStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Image
                  source={require("../assets/Images/van-blue.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/van-silver.png")}
                  style={{ width: 23, height: 23 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="EventsStack"
        component={EventsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Image
                  source={require("../assets/Images/calendar.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/calendar-silver.png")}
                  style={{ width: 23, height: 23 }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Image
                  source={require("../assets/Images/portrait.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/portrait-silver.png")}
                  style={{ width: 23, height: 23 }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
