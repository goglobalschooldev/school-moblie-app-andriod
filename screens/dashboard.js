import React, { useContext, useState, useEffect, useMemo } from "react";
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
  Alert,
  Animated,
} from "react-native";
import { COLORS } from "../color";
import EventCards from "../components/EventCards";
import StudentCard from "../components/StudentCard";
import { StyleController } from "../static/styleProvider";
import Header from "../routes/header/Header";
import { Ionicons } from "@expo/vector-icons";
import { DataController } from "../context/Provider";
import { QUERY_STUDENTS } from "../graphql/gql_students";
import { useQuery, useMutation } from "@apollo/client";
import { ACTION } from "../context/Reducer";
import { QUERY_EVENTS } from "../graphql/gql_events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QUERY_ANNOUNCEMENT } from "../graphql/gql_announcement";
import AnnouncementCard from "../components/Announcement";
import moment from "moment";
import { EVENT_PAGINATION } from "../graphql/gql_eventWithPagination";
import { ACADEMIC_YEAR } from "../graphql/gql_academicYear";
import { MaterialIcons } from "@expo/vector-icons";
import { DELETE_NOTIFICATION } from "../graphql/gql_deleteNotificationByMobileUserId";
import { useTranslation } from "react-multi-lang";
//
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Dashboard({ navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const [dataArray, setDateArray] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const {
    accountDBCtx,
    accountDBCtxDispatch,
    studentsDBCtxDispatch,
    logined,
    studentsDBCtx,
  } = useContext(DataController);
  const t = useTranslation();
  // console.log(studentsDBCtx,"studentsDBCtx")

  //
  var num = 1;
  //
  let currentDate = moment().locale("en").format("YYYY-MM-DD");
  //
  const [deleteNotificationByMobileUserId] = useMutation(DELETE_NOTIFICATION, {
    onCompleted: ({ deleteNotificationByMobileUserId }) => {
      // console.log(
      //   deleteNotificationByMobileUserId,
      //   "test deleteNotificationByMobileUserId"
      // );
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  useEffect(() => {
    deleteNotificationByMobileUserId({
      variables: {
        mobileUserId: accountDBCtx?.user?._id,
      },
    });
  }, []);

  //Active Academic
  const { data: academicData, loading: academicLoading } =
    useQuery(ACADEMIC_YEAR);
  let activeAcademic = academicData?.getActiveAcademicYear[0];
  // console.log(activeAcademic?._id, "id");

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
    onCompleted: ({ getEvents }) => {
      // console.log(getEvents, "test");
    },
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

  //Query Announcement
  const {
    data: Announcement,
    loading: announcementLoading,
    refetch: refetchAnnoucement,
  } = useQuery(QUERY_ANNOUNCEMENT, {
    notifyOnNetworkStatusChange: true,
  });
  let AnnouncementData = useMemo(() => {
    if (!Announcement?.getAnnouncement) {
      return [];
    }
    return Announcement?.getAnnouncement;
  }, [Announcement?.getAnnouncement]);
  // console.log(AnnouncementData,"AnnouncementData")

  useEffect(() => {
    const announcementInterval = setInterval(() => {
      refetchAnnoucement();
    }, 10000);

    return () => {
      clearInterval(announcementInterval);
    };
    // refetchAnnoucement();
  }, [Announcement?.getAnnouncement]);

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
  // console.log(ParentId, "ParentId")
  const [dataSubUser, setDataSubUser] = useState([]);
  const {
    data: userDB,
    loading,
    refetch,
    error,
  } = useQuery(QUERY_STUDENTS, {
    variables: {
      parentId: ParentId?._id,
    },
    pollInterval: 2000,
    onCompleted: ({ getStudentsByParents }) => {
      // console.log(getStudentsByParents, "test");
    },
    onError: async (error) => {
      console.log(error.message, "Error student");
    },
  });

  // console.log(userDB,"userDB")
  useEffect(() => {
    if (userDB) {
      refetch();
      studentsDBCtxDispatch({
        type: ACTION.QUERY_STUDENTS,
        payload: userDB?.getStudentsByParents,
      });
      setDataSubUser(userDB?.getStudentsByParents);
    }
  }, [userDB, ParentId, Announcement]);

  //
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //
  if ((loading && eventLoading && announcementLoading) || refreshing) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
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
              borderBottomWidth: 1,
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
              {/* <TypeWriter/> */}

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
                    {dataSubUser?.map((load) => (
                      <TouchableOpacity
                        key={load?._id}
                        onPress={
                          () => navigation.navigate("StuClass", { data: load })
                          // navigation.navigate("StuClass", {
                          //   data: load,
                          //   otherParam: distance,
                          // })
                        }
                      >
                        <StudentCard {...load} stuLoading={loading} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </ImageBackground>
              </View>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressBackgroundColor="white"
              />
            }
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
              <MaterialIcons
                name="notifications-active"
                size={18}
                style={{ color: COLORS.MAIN, alignSelf: "center" }}
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
            <View
              style={{
                flexDirection: "row",
                width: width * 0.95,
                alignSelf: "center",
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
          </ScrollView>
        </View>
      </>
    );
  }
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
