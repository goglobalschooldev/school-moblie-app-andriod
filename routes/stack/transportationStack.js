import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Transportation from "../../screens/transportation";
import NotificationList from "../../components/transportation/notificationList";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";

const Stack = createNativeStackNavigator();

const TransportationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Transportation" component={Transportation} />
      <Stack.Screen name="NotificationList" component={NotificationList} />
      {/* <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} /> */}
    </Stack.Navigator>
  );
};

export default TransportationStack;
