import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../../screens/profile";
import NotificationList from "../../components/transportation/notificationList";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="NotificationList" component={NotificationList} /> */}
      {/* <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
