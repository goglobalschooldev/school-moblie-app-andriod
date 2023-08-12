import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigation from "./tabNavigation";
import TransportationList from "../components/transportation/transportationList";


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      {/* <Stack.Screen name="TransportationList" component={TransportationList} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
