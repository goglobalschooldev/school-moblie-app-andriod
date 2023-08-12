import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";
import StuClass from "../../components/task/stuClass";
import Dashboard from "../../screens/dashboard";
import Profile from "../../screens/profile";
import Schedule from "../../components/task/Schedule";
import Attendance from "../../components/task/Attendance";
import LoginScreen from "../../screens/loginScreen";
import AcedemicFees from "../../components/task/AcedemicFees";
import ExecuteScore from "../../components/task/ExecuteScore";
import ChildReport from "../../components/task/ChildReport";
import LunchAtt from "../../components/task/LunchAtt";
import RecordAttendance from "../../components/task/RecordAttendance";
import LeaveScreen from "../../components/task/LeaveScreen";
import RequestDetail from "../../components/task/RequestDetail";
import LeaveRequest from "../../components/task/LeaveRequest";
import NotificationScreen from "../../screens/notification";
import ViewAllLeaveScreen from "../../components/dashboard/ViewAllLeaveScreen";
import LeaveDetials from "../../components/dashboard/LeaveDetials";
import TransportationList from "../../components/transportation/transportationList";

const Stack = createNativeStackNavigator();

const DashboardStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="StuClass" component={StuClass} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="AcedemicFees" component={AcedemicFees} />
      <Stack.Screen name="ExecuteScore" component={ExecuteScore} />
      <Stack.Screen name="ChildReport" component={ChildReport} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="LunchAtt" component={LunchAtt} />
      <Stack.Screen name="RecordAttendance" component={RecordAttendance} />
      <Stack.Screen name="LeaveScreen" component={LeaveScreen} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
      <Stack.Screen name="LeaveRequest" component={LeaveRequest} />
      <Stack.Screen name="TransportationList" component={TransportationList} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="ViewAllLeaveScreen" component={ViewAllLeaveScreen} />
      <Stack.Screen name="LeaveDetials" component={LeaveDetials} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
