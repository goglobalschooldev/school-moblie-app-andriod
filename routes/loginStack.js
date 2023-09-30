import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../screens/dashboard";
import LoginScreen from "../screens/loginScreen";
import SplashScreen from "../screens/splashScreen";
import AnnouncementDetail from "../components/dashboard/AnnouncementDetail";
import TransportationList from "../components/transportation/transportationList";
import ForgotPassword from "../screens/ForgotPassword";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgetScreen" component={ForgotPassword} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="TransportationList" component={TransportationList} />
      {/* <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} /> */}
    </Stack.Navigator>
  );
};

export default LoginStack;
