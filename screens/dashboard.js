import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
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
} from "react-native";
import { COLORS } from "../color";
import EventCards from "../components/EventCards";
import StudentCard from "../components/StudentCard";
import { StyleController } from "../static/styleProvider";
import Header from "../routes/header/Header";
import { DataController } from "../context/Provider";
import { useQuery } from "@apollo/client";
import { ACTION } from "../context/Reducer";
import { QUERY_EVENTS } from "../graphql/gql_events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { ACADEMIC_YEAR } from "../graphql/gql_academicYear";
import { useTranslation } from "react-multi-lang";
import * as Notifications from "expo-notifications";
import { QUERY_ANNOUNCEMENT } from "../graphql/gql_announcement";
//graphql
import { GET_STUDENT } from "../graphql/get_studentByParent";
import graphQLClient from "../config/endpoint_2";
import AnnouncementCard from "../components/Announcement";
import { GER_ACADEMICCALENDAR } from "../graphql/Get_AcademicCalendarPagination";
import { GER_USERINFO } from "../graphql/Get_MobileUserLogin";

//
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Dashboard({ navigation }) {
  const { height, width } = useContext(StyleController);
  const { accountDBCtx, accountDBCtxDispatch, logined } =
    useContext(DataController);
  const t = useTranslation();
  const [notiTest, setNotiTest] = useState("");
  var num = 1;
  const notificationListener = useRef();
  const responseListener = useRef();
  let ParentId = accountDBCtx?.uid;

  const {
    data: Announcement,
    loading: announcementLoading,
    refetch: refetchAnnoucement,
  } = useQuery(QUERY_ANNOUNCEMENT, {
    variables: {
      page: 1,
      limit: 1000,
      from: "",
      to: "",
      keyword: "",
      publish: true,
    },
    notifyOnNetworkStatusChange: true,
    pollInterval: 2000,
    onCompleted: ({ getAnnouncementsPagination }) => {},
    onError: async (error) => {
      console.log(error.message, "Error Announcement");
    },
  });
  let AnnouncementData = useMemo(() => {
    if (!Announcement?.getAnnouncementsPagination?.data) {
      return [];
    }
    return Announcement?.getAnnouncementsPagination?.data;
  }, [Announcement?.getAnnouncementsPagination?.data]);
  // console.log(AnnouncementData, "AnnouncementData");

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

  const [Students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const GetStudentsForMobile = await graphQLClient.request(GET_STUDENT, {
          parentsId: ParentId,
        });
        setStudents(GetStudentsForMobile?.getStudentByParentsMobile);
      } catch (error) {
        console.log(error.message, "Error GetStudentsForMobile");
      }
    }
    fetchData();
    refetchAnnoucement();
  }, [ParentId]);

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
          width: width,
          height: height,
          backgroundColor: COLORS.WHITE,
        }}
      >
        {/* <ModalProminent/> */}
        {/*  */}
        <View
          style={{
            width: width,
            alignSelf: "center",
            height: height * 0.29,
            backgroundColor: COLORS.WHITE,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: width * 0.95,
              alignSelf: "center",
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
              flex: 1,
              width: width,
              alignSelf: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#E4E4E4",
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
          showsVerticalScrollIndicator={false}
        >
          {/* <View
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
          </View> */}

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
          <View
            style={{
              flexDirection: "row",
              width: width * 0.95,
              height: height * 0.08,
              alignSelf: "center",
              alignItems: "center",
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            <Image
              source={require("../assets/Images/announcement.png")}
              style={{ width: 20, height: 20, alignSelf: "center" }}
            />
            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 14,
                color: "#EA2877",
                left: 3,
              }}
            >
              {t("ដំណឹងថ្មីៗ")}
            </Text>
          </View>
          <View style={{ marginBottom: height / 4 }}>
            {AnnouncementData?.map((items) => (
              <TouchableOpacity
                key={items?._id}
                onPress={() =>
                  navigation.navigate("AnnouncementDetail", { data: items })
                }
              >
                <AnnouncementCard {...items} loading={announcementLoading} />
              </TouchableOpacity>
            ))}
          </View>
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
