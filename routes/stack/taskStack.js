import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AcedemicFees from "../../components/task/AcedemicFees";
import Attendance from "../../components/task/Attendent";
import ChildReport from "../../components/task/ChildReport";
import ExecuteScore from "../../components/task/ExecuteScore";
import LunchAtt from "../../components/task/LunchAtt";
import Schedule from "../../components/task/Schedule";
import StuClass from "../../components/task/stuClass";
import Profile from "../../screens/profile";
import Tasks from "../../screens/tasks";
import RecordAttendance from "../../components/task/RecordAttendance";
import LeaveScreen from "../../components/task/LeaveScreen";
import RequestDetail from "../../components/task/RequestDetail";
import LeaveRequest from "../../components/task/LeaveRequest";
import NotificationList from "../../components/transportation/notificationList";
import AnnouncementDetail from "../../components/dashboard/AnnouncementDetail";

const Stack = createNativeStackNavigator();

const TaskStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tasks" component={Tasks} />
      <Stack.Screen name="StuClass" component={StuClass} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Attendance" component={Attendance} />
      <Stack.Screen name="AcedemicFees" component={AcedemicFees} />
      <Stack.Screen name="ExecuteScore" component={ExecuteScore} />
      <Stack.Screen name="ChildReport" component={ChildReport} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="LunchAtt" component={LunchAtt} />
      <Stack.Screen name="RecordAttendance" component={RecordAttendance} />
      <Stack.Screen name="LeaveScreen" component={LeaveScreen} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
      <Stack.Screen name="LeaveRequest" component={LeaveRequest} />
      {/* <Stack.Screen name="NotificationList" component={NotificationList} /> */}
      {/* <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} /> */}
    </Stack.Navigator>
  );
};

export default TaskStack;
