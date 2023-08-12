import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from "react-native";
import StudentCard from "../components/StudentCard";
import { DataController } from "../context/Provider";
import Header from "../routes/header/Header";
import { StyleController } from "../static/styleProvider";
import { useQuery } from "@apollo/client/react";
import { QUERY_STUDENTS } from "../graphql/gql_students";
import { ACTION } from "../context/Reducer";
import { COLORS } from "../color";
import { getKhmerNumber } from "../static/khmerNumber";
import { ACADEMIC_YEAR } from "../graphql/gql_academicYear";
import { getLanguage, useTranslation, setTranslations } from "react-multi-lang";
import { getEngNumber } from "../static/engNumber";
import moment from "moment";
import localization from "moment/locale/km";
import { RefreshControl } from "react-native";
import * as Location from "expo-location";
import { getDistance, getPreciseDistance, isPointWithinRadius } from "geolib";
import { Image } from "react-native";
import { QUERY_ANNOUNCEMENT } from "../graphql/gql_announcement";
import AnnouncementCard from "../components/Announcement";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Tasks = ({ navigation }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, studentsDBCtxDispatch, sectionDBCtx } =
    useContext(DataController);
  const [academicName, setAcademicName] = useState();
  const [academicYear, setAcademicYear] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const t = useTranslation();
  let ParentId = accountDBCtx?.user?.parentId;
  const [location, setLocation] = useState(null);
  const [dislongLat, setDisLongLat] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

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
    onCompleted: ({ getStudentsByParents }) => {
      // console.log(getStudentsByParents, "getStudentsByParents");
    },
    onError: (error) => {
      console.log(error.message, "error");
    },
  });
  useEffect(() => {
    if (userDB) {
      refetch();
      studentsDBCtxDispatch({
        type: ACTION.QUERY_STUDENTS,
        payload: userDB?.getStudentsByParents,
      });
      setDataSubUser(userDB?.getStudentsByParents);
    }
  }, [userDB, ParentId]);

  const {
    data: academicData,
    loading: academicLoading,
    refetch: academicRefetch,
  } = useQuery(ACADEMIC_YEAR);
  useEffect(() => {
    if (academicData) {
      academicRefetch();
      try {
        let digits =
          academicData?.getActiveAcademicYear[0]?.academicYear?.split("-");
        let index1 = getKhmerNumber(digits[0]);
        let index2 = getKhmerNumber(digits[1]);
        let yearName = index1 + "~" + index2;
        setAcademicName(yearName);
        // setAcademicName(digits);
        // console.log(digits, "digits")
      } catch (error) {
        console.log(error);
      }
    }
  }, [academicData]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetchAnnoucement();
    wait(2000).then(() => setRefreshing(false) && academicRefetch());
  }, []);

  useEffect(() => {
    if (academicName === "២០២២~២០២៣") {
      setAcademicYear(`${t("២០២២~២០២៣")}`);
    } else if (academicName === "២០២៣~២០២៤") {
      setAcademicYear(`${t("២០២៣~២០២៤")}`);
    } else if (academicName === "២០២៤~២០២៥") {
      setAcademicYear(`${t("២០២៤~២០២៥")}`);
    } else if (academicName === "២០២៥~២០២៦") {
      setAcademicYear(`${t("២០២៥~២០២៦")}`);
    } else if (academicName === "២០២៦~២០២៧") {
      setAcademicYear(`${t("២០២៦~២០២៧")}`);
    } else if (academicName === "២០២៧~២០២៨") {
      setAcademicYear(`${t("២០២៧~២០២៨")}`);
    } else {
      setAcademicYear(academicName);
    }
  });

  //Query Announcement
  const {
    data: Announcement,
    loading: announcementLoading,
    refetch: refetchAnnoucement,
  } = useQuery(QUERY_ANNOUNCEMENT, {
    notifyOnNetworkStatusChange: true,
    // pollInterval: 1000,
  });
  // let AnnouncementData = useMemo(() => {
  //   if (!Announcement?.getAnnouncement) {
  //     return [];
  //   }
  //   return Announcement?.getAnnouncement;
  // }, [Announcement?.getAnnouncement]);
  // console.log(AnnouncementData, "AnnouncementData");

  // useEffect(() => {
  //   const announcementInterval = setInterval(() => {
  //     refetchAnnoucement();
  //   }, 10000);

  //   return () => {
  //     clearInterval(announcementInterval);
  //   };
  //   // refetchAnnoucement();
  // }, [Announcement?.getAnnouncement]);

  if (loading || academicLoading || refreshing || announcementLoading) {
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
        <Header
          title={t("ឆ្នាំសិក្សា") + " " + academicYear}
          navigation={navigation}
        />
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          width: width,
          height: height,
          // backgroundColor: COLORS.WHITE,
        }}
      >
        {/* <ModalProminent/> */}
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
          {Announcement?.getAnnouncement?.map((items) => (
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
};

export default Tasks;

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
