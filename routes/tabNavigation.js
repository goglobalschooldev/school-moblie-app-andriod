import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect } from "react";
import { Image, View } from "react-native";
import DashboardStack from "../routes/stack/dashboardStack";
import AcademicStack from "../routes/stack/academicStack";
import EventsStack from "../routes/stack/eventStack";
import ProfileStack from "../routes/stack/profileStack";
import Constants from "expo-constants";
import { Avatar, Badge } from "react-native-elements";
import VersionCheck from "react-native-version-check";
import { useState } from "react";
import Aboutschool from "../screens/aboutschool";
import { DataController } from "../context/Provider";
import { useQuery } from "@apollo/client";
import { GER_PARENTSBYID } from "../graphql/Get_ParentsById";
import { useMemo } from "react";
import { COLORS } from "../color";
import AnnounmentStack from "./stack/announcementStack";
import Schoolfee from "../screens/schoolfee";

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
      // console.log("Latest version:", latestVersion);
      setLastestVersion(latestVersion);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLatestVersion();
  }, []);
  useEffect(() => {
    ParentRefetch();
  }, [accountDBCtx]);

  const { accountDBCtx } = useContext(DataController);

  const {
    data: ParentData,
    loading: ParentLoading,
    error: ParentError,
    refetch: ParentRefetch,
  } = useQuery(GER_PARENTSBYID, {
    variables: {
      id: accountDBCtx?.uid,
    },
    pollInterval: 2000,
    onCompleted: ({ getParentsById }) => {
      console.log(getParentsById, "parentinfo");
    },
    onError: async (error) => {
      console.log(error.message, "Error parentinfo");
      // if (error.message === "Not Authorized") {
      //   await AsyncStorage.removeItem("@userData");
      //   loginedDispatch({
      //     type: ACTION.LOGIN_USER,
      //     payload: false,
      //   });
      // }
    },
  });
  let ProfileImage = ParentData?.getParentsById?.profileImg;

  const UserImage = useMemo(() => {
    const userImage = "https://storage.go-globalschool.com/api" + ProfileImage;
    if (
      userImage === "https://storage.go-globalschool.com/api" ||
      null ||
      ProfileImage === null
    ) {
      return (
        <Image
          resizeMode="cover"
          style={{
            height: 28,
            width: 28,
            borderRadius: 50,
            position: "absolute",
          }}
          source={require("../assets/Images/user.png")}
        />
      );
    } else {
      return (
        <Image
          resizeMode="contain"
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            position: "absolute",
          }}
          source={{ uri: userImage + "?time=" + new Date() }}
        />
      );
    }
  }, [accountDBCtx, ProfileImage]);
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
        name="AcademicStack"
        component={AcademicStack}
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

      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="AnnounmentStack"
        component={AnnounmentStack}
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
                  source={require("../assets/Images/loudspeaker2.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/loudspeaker1.png")}
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
        name="Schoolfee"
        component={Schoolfee}
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
                  source={require("../assets/Images/coin1.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/coin2.png")}
                  style={{ width: 23, height: 23 }}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Aboutschool"
        component={Aboutschool}
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
                  source={require("../assets/Images/home2.png")}
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Image
                  source={require("../assets/Images/home1.png")}
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
                  <Avatar
                    size={24}
                    rounded
                    ImageComponent={() => UserImage}
                    overlayContainerStyle={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: COLORS.ORANGE,
                      borderWidth: 1,
                      resizeMode: "cover",
                    }}
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
                  <Avatar
                    size={23}
                    rounded
                    ImageComponent={() => UserImage}
                    overlayContainerStyle={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: COLORS.ORANGE,
                      borderWidth: 1,
                      resizeMode: "cover",
                    }}
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
