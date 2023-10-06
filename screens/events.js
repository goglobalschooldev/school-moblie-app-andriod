import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  SectionList,
  ImageBackground,
} from "react-native";
import { COLORS } from "../color";
import EventCards from "../components/EventCards";
import Header from "../routes/header/Header";
import { StyleController } from "../static/styleProvider";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../graphql/gql_events";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import { DataController } from "../context/Provider";
import { ACADEMIC_YEAR } from "../graphql/gql_academicYear";
import { useTranslation } from "react-multi-lang";
import { PartComponent } from "../static/part-component";
import graphQLClient from "../config/endpoint_2";
import { getLanguage } from "react-multi-lang";
import { GER_ACADEMICCALENDAR } from "../graphql/Get_AcademicCalendarPagination";

//
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Events = ({ navigation }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx } = useContext(DataController);
  const [dataArray, setDateArray] = useState();
  const [academicName, setAcademicName] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [academicYear, setAcademicYear] = useState();
  const [limit, setLimit] = useState(1000);
  const t = useTranslation();

  var num = 1;

  const [activeAcademic, setActiveAcademic] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const getActiveAcademicYear = await graphQLClient.request(
          ACADEMIC_YEAR
        );
        setActiveAcademic(getActiveAcademicYear?.getActiveAcademicYear);
        // console.log(getActiveAcademicYear, "getActiveAcademicYear");
      } catch (error) {
        console.log(error?.message, "error getActiveAcademicYear");
      }
    }
    fetchData();
  }, []);
  const [academicCalendar, setAcademicCalendar] = useState([]);

  const {
    data: AnnouncementData,
    loading: AnnouncementLoading,
    refetch: refetchAnnouncement,
  } = useQuery(GER_ACADEMICCALENDAR, {
    variables: {
      limit: limit,
      lg: "KH",
      page: 1,
      keyword: "",
    },
    pollInterval: 2000,
    onCompleted: ({}) => {
      setAcademicCalendar(
        AnnouncementData?.getAcademicCalendarPagination?.data
      );
    },
    onError: async (error) => {
      console.log(error.message, "Error Announcement");
    },
  });

  useEffect(() => {
    let eventsData = academicCalendar;
    if (academicCalendar) {
      let sortedArray = [...eventsData]?.sort(
        (a, b) =>
          moment(a.eventDate).locale("en").format("YYYYMMDD") -
          moment(b.eventDate).locale("en").format("YYYYMMDD")
      );
      setDateArray(sortedArray);
    }
  }, [academicCalendar]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false) && academicRefetch());
  }, []);

  // console.log(dataArray, "dataArray");
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
        <Header title={t("ប្រតិទិនសិក្សា")} navigation={navigation} />
      </SafeAreaView>

      <View
        style={{
          flex: 1,
          height: height * 1,
          backgroundColor: COLORS.WHITE,
        }}
      >
        <ImageBackground
          source={require("../assets/Images/Dashboard.png")}
          resizeMode="contain"
          style={{
            flex: 1,
            justifyContent: "flex-start",
          }}
        >
          {/* {dataArray === null ? ( */}
          <View
            style={{
              flexDirection: "column",
              height: height * 0.17,
              width: width * 0.95,
              alignSelf: "center",
              top: 10,
            }}
          >
            <View
              style={{
                width: width * 0.95,
                height: height * 0.09,
                alignSelf: "center",
                borderRadius: 15,
                backgroundColor: COLORS.BLUE_LIGHT,
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", left: 10 }}>
                <View
                  style={{
                    justifyContent: "center",
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 50,
                  }}
                >
                  <Entypo
                    name="graduation-cap"
                    size={32}
                    style={{
                      alignSelf: "center",
                      color: COLORS.MAIN,
                    }}
                  />
                </View>
                <View style={{ justifyContent: "center", left: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Bayon-Regular",
                      color: COLORS.MAIN,
                      fontSize: 20,
                    }}
                  >
                    {t("ឆ្នាំសិក្សា") +
                      " " +
                      (getLanguage() === "en"
                        ? activeAcademic?.academicYearName === null
                          ? "2022~2023"
                          : activeAcademic?.academicYearName
                        : activeAcademic?.academicYearKhName === null
                        ? "២០២២~២០២៣"
                        : activeAcademic?.academicYearKhName)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ top: 10 }}>
              <PartComponent title={t("ខែ តុលា ឆ្នាំ ២០២២")} />
            </View>
          </View>
          {/* 
           ) : (
             <View
              style={{
                width: width,
                height: height * 0.7,
                justifyContent: "center",
                alignItems: "center",
               }}
             >
               <Text
                 style={{
                   fontFamily: "Kantumruy-Regular",
                   fontSize: 16,
                   color: COLORS.MAIN,
                 }}
               >
                 {t("មិនមានទិន្នន័យ")}
               </Text>
             </View>
           )} 
          */}
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressBackgroundColor="white"
              />
            }
          >
            {dataArray?.map((item) => {
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
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
};
export default Events;
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    justifyContent: "center",
  },
});
