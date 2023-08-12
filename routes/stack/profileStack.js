import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../../screens/profile";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";
import TransportationList from "../../components/transportation/transportationList";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TransportationList" component={TransportationList} />
      {/* <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} /> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
