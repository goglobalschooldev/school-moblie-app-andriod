import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Transportation from "../../screens/transportation";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";
import NotificationScreen from "../../screens/notification";
import TransportationList from "../../components/transportation/transportationList";

const Stack = createNativeStackNavigator();

const TransportationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Transportation" component={Transportation} />
      <Stack.Screen name="TransportationList" component={TransportationList} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      {/* <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} /> */}
    </Stack.Navigator>
  );
};

export default TransportationStack;
