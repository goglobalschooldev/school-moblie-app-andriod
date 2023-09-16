import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { COLORS } from "../color";
import EventCards from "../components/EventCards";
import StudentCard from "../components/StudentCard";
import { StyleController } from "../static/styleProvider";
import Header from "../routes/header/Header";
import { Ionicons } from "@expo/vector-icons";
import { DataController } from "../context/Provider";
import { useQuery } from "@apollo/client";
import { ACTION } from "../context/Reducer";
import { QUERY_EVENTS } from "../graphql/gql_events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { ACADEMIC_YEAR } from "../graphql/gql_academicYear";
import { useTranslation } from "react-multi-lang";
import * as Notifications from "expo-notifications";
import LeaveBottomSheet from "../components/dashboard/LeaveBottomSheet";
import ViewLeaveCard from "../components/ViewLeaveCard";

//graphql
import { GET_STUDENT } from "../graphql/get_studentByParent";
import graphQLClient from "../config/endpoint_2";
//
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Dashboard({ navigation }) {
  const { height, width } = useContext(StyleController);
  const [dataArray, setDateArray] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const { accountDBCtx, accountDBCtxDispatch, logined } =
    useContext(DataController);
  const t = useTranslation();
  const [notiTest, setNotiTest] = useState("");

  var num = 1;
  let currentDate = moment().locale("en").format("YYYY-MM-DD");
  const notificationListener = useRef();
  const responseListener = useRef();

  //noti
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotiTest(notification.request.content.data?.stu_id);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        notificationNavigationHandler(response.notification.request.content);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const notificationNavigationHandler = ({ data }) => {
    if (data?.action === "transportaion") {
      navigation.navigate("NotificationList", {
        studentId: data?.stu_id,
      });
    }
  };

  //Active Academic
  const [activeAcademic, setActiveAcademic] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const getActiveAcademicYear = await graphQLClient.request(
          ACADEMIC_YEAR
        );
        setActiveAcademic(getActiveAcademicYear?.getActiveAcademicYear);
      } catch (error) {
        console.log(error?.message, "error getActiveAcademicYear");
      }
    }
    fetchData();
  }, []);
  //Query Events
  const {
    data: Data,
    loading: eventLoading,
    errors,
    refetch: eventRefetch,
  } = useQuery(QUERY_EVENTS, {
    variables: {
      academicYearId: activeAcademic?._id,
    },
    pollInterval: 2000,
    onCompleted: ({ getEvents }) => {},
    onError: async (error) => {
      console.log(error.message, "Error event");
    },
  });

  useEffect(() => {
    if (Data?.getEvents) {
      let eventsData = Data?.getEvents;
      let filterData = eventsData?.filter(
        (e) =>
          moment(e?.eventDate).locale("en").format("YYYY-MM-DD") >= currentDate
      );

      let sortedArray = [...filterData]?.sort(
        (a, b) =>
          moment(a.eventDate).locale("en").format("YYYYMMDD") -
          moment(b.eventDate).locale("en").format("YYYYMMDD")
      );
      // console.log(sortedArray?.map(e => moment(e?.eventDate).locale('en')?.format('YYYY-MM-DD') +" - "+moment(e?.endEventDate).locale('en')?.format('YYYY-MM-DD')),"sortedArray")
      setDateArray(sortedArray);
    }
    eventRefetch();
  }, [Data?.getEvents]);
  // console.log(dataArray,"dataArray")

  let sliceEvent = dataArray?.slice(0, 3);
  // console.log(sliceEvent, "sliceEvent");

  //LocalStorage
  const setLocalStorage = async () => {
    let loginUser = await AsyncStorage.getItem("@login");
    let newLogin = loginUser === null ? {} : JSON.parse(loginUser);
    if (logined) {
      accountDBCtxDispatch({
        type: ACTION.LOGIN_USER,
        payload: newLogin,
      });
    }
  };
  useEffect(() => {
    setLocalStorage();
  }, [navigation]);

  //Query Student
  let ParentId = accountDBCtx?.user?.parentId;

  const [Students, setStudents] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const GetStudentsForMobile = await graphQLClient.request(GET_STUDENT, {
          parentsId: ParentId?._id,
        });
        setStudents(GetStudentsForMobile?.getStudentByParentsMobile);
        // console.log(GetStudentsForMobile);
      } catch (error) {
        // console.log(error.message, "Error GetStudentsForMobile");
      }
    }
    fetchData();
  }, [ParentId?._id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //
  if (refreshing) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />

      <SafeAreaView>
        <Header title={t("ទំព័រដើម")} navigation={navigation} />
      </SafeAreaView>

      <View
        style={{
          flex: 1,
          width: width,
          height: height,
          backgroundColor: COLORS.WHITE,
        }}
      >
        {/* <ModalProminent/> */}
        {/*  */}
        <View
          style={{
            width: width * 1,
            backgroundColor: COLORS.WHITE,
            borderBottomWidth: 0.5,
            borderBottomColor: "#E4E4E4",
          }}
        >
          <View
            style={{
              width: width * 0.95,
              alignSelf: "center",
              justifyContent: "center",
              // flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 20,
                color: COLORS.MAIN,
              }}
            >
              {t("បុត្រធីតា")}
            </Text>
          </View>
          <View
            style={{
              width: width,
              alignSelf: "center",
              height: height * 0.24,
              backgroundColor: COLORS.WHITE,
              flexDirection: "column",
              justifyContent: "center",
              // paddingTop: 5,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <ImageBackground
                source={require("../assets/Images/Dashboard.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  stickyHeaderIndices={[1]}
                >
                  {Students?.map((load) => (
                    <TouchableOpacity
                      key={load?._id}
                      onPress={() =>
                        navigation.navigate("StuClass", { data: load })
                      }
                    >
                      <StudentCard {...load} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </ImageBackground>
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //     progressBackgroundColor="white"
          //   />
          // }
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              width: width * 0.95,
              alignSelf: "center",
              paddingTop: 8,
            }}
          >
            <Image
              source={require("../assets/Images/bell.png")}
              style={{
                width: 18,
                height: 18,
                marginTop: 4,
              }}
            />
            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 16,
                color: COLORS.MAIN,
                left: 3,
              }}
            >
              {t("ព្រឹត្តិការណ៍នាពេលខាងមុខ")}
            </Text>
          </View>
          {sliceEvent?.map((item) => {
            num++;
            return (
              <View key={item?._id}>
                <EventCards
                  {...item}
                  bgColor={
                    num % 2 == 0 ? COLORS.BLUE_LIGHT : COLORS.ORANGE_LIGHT
                  }
                  color={num % 2 == 0 ? COLORS.BLUE_DARK : COLORS.ORANGE_DARK}
                />
              </View>
            );
          })}
          {/* <View
            style={{
              flexDirection: "row",
              width: width * 0.95,
              alignSelf: "center",
              paddingTop: 8,
            }}
          >
            <Ionicons
              name="ios-documents"
              size={18}
              style={{ color: "#D73275", alignSelf: "center" }}
            />

            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 16,
                color: "#D73275",
                left: 3,
              }}
            >
              {t("ការស្នើសុំច្បាប់")}
            </Text>
          </View> */}
          {/* <LeaveBottomSheet
            navigation={navigation}
            dataSubUser={Students}
            academicYear={activeAcademic}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewAllLeaveScreen", { ParentId: ParentId })
            }
            className="pb-3"
          >
            <ViewLeaveCard />
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    justifyContent: "center",
  },
});
