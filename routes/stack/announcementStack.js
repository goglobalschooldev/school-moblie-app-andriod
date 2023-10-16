import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";
import Announcements from "../../screens/announcement";
const Stack = createNativeStackNavigator();

const AnnounmentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Announcements"
    >
      <Stack.Screen name="Announcements" component={Announcements} />
      <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} />
    </Stack.Navigator>
  );
};

export default AnnounmentStack;
