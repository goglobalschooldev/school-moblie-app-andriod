import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Events from "../../screens/events";
import Profile from "../../screens/profile";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";
import NotificationScreen from "../../screens/notification";
import TransportationList from "../../components/transportation/transportationList";

const Stack = createNativeStackNavigator();

const EventsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TransportationList" component={TransportationList} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      {/* <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} /> */}
    </Stack.Navigator>
  );
};

export default EventsStack;
