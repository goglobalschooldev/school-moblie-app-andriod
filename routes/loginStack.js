import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../screens/dashboard";
import LoginScreen from "../screens/loginScreen";
import SplashScreen from "../screens/splashScreen";
import NotificationList from "../components/transportation/notificationList";
import AnnouncementDetail from "../components/dashboard/AnnouncementDetail";

const Stack = createNativeStackNavigator();

const LoginStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} />
    </Stack.Navigator>
  );
};

export default LoginStack;
