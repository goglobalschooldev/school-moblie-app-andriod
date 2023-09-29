import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
import DashboardStack from "../routes/stack/dashboardStack";
import EventsStack from "../routes/stack/eventStack";
import ProfileStack from "../routes/stack/profileStack";
import TransportationStack from "./stack/transportationStack";
import Constants from "expo-constants";
import { Badge } from "react-native-elements";
import VersionCheck from "react-native-version-check";
import { useState } from "react";

const Tab = createBottomTabNavigator();
const TabNavigation = ({ navigation }) => {
  React.useEffect(() => {}, [navigation]);
  const version = Constants.manifest.version;
  const [latestVersion, setLastestVersion] = useState("");

  const checkLatestVersion = async () => {
    try {
      const options = {
        packageName: "com.goglobalschool.schoolmobile", // Replace with your app's package name
        ignoreErrors: true, // Optional: Set to false to throw an error if the latest version cannot be fetched
      };

      const latestVersion = await VersionCheck.getLatestVersion(options);
      console.log("Latest version:", latestVersion);
      setLastestVersion(latestVersion);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLatestVersion();
  }, []);
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
      {/* <Tab.Screen
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
      /> */}
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
                <>
                  <Image
                    source={require("../assets/Images/portrait.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: -10,
                      left: 15,
                      opacity: version >= latestVersion ? 0 : 1,
                    }}
                  >
                    <Badge
                      value="!"
                      status="error"
                      textStyle={{ fontSize: 10 }}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Image
                    source={require("../assets/Images/portrait-silver.png")}
                    style={{ width: 23, height: 23 }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: -10,
                      left: 15,
                      opacity: version >= latestVersion ? 0 : 1,
                    }}
                  >
                    <Badge
                      value="!"
                      status="error"
                      textStyle={{ fontSize: 10 }}
                    />
                  </View>
                </>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
