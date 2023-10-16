import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";
import Academic_calendar from "../../screens/academic_calendar";
import KhmerProgramme from "../../components/curriculum/khmer_programme";
import ForeignLanguageProgramme from "../../components/curriculum/foreign_language_programme";

const Stack = createNativeStackNavigator();

const AcademicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Announcements"
    >
      <Stack.Screen name="Academic_calendar" component={Academic_calendar} />
      <Stack.Screen name="KhmerProgramme" component={KhmerProgramme} />
      <Stack.Screen
        name="ForeignLanguageProgramme"
        component={ForeignLanguageProgramme}
      />
    </Stack.Navigator>
  );
};

export default AcademicStack;
