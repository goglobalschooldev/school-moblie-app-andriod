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
} from "react-native";
import { COLORS } from "../color";
import EventCards from "../components/EventCards";
import Header from "../routes/header/Header";
import { StyleController } from "../static/styleProvider";
import { Divider } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../graphql/gql_events";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import { QUERY_STUDENTS } from "../graphql/gql_students";
import { DataController } from "../context/Provider";
import { getKhmerNumber } from "../static/khmerNumber";
import { ACADEMIC_YEAR } from "../graphql/gql_academicYear";
import { useTranslation } from "react-multi-lang";
import { PartComponent } from "../static/part-component";

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
  const t = useTranslation();

  var num = 1;
  //Active Academic
  const { data: academic } = useQuery(ACADEMIC_YEAR);
  let activeAcademic = academic?.getActiveAcademicYear[0];
  // console.log(activeAcademic, "activeAcademic");

  //
  const { data, loading, refetch } = useQuery(QUERY_EVENTS, {
    variables: {
      academicYearId: activeAcademic?._id,
    },
    onCompleted: ({ getEvents }) => {
      // console.log(getEvents, "test");
    },
    onError: (error) => {
      console.log(error.message, "error");
    },
  });

  useEffect(() => {
    let eventsData = data?.getEvents;
    if (data?.getEvents) {
      let sortedArray = [...eventsData]?.sort(
        (a, b) =>
          moment(a.eventDate).locale("en").format("YYYYMMDD") -
          moment(b.eventDate).locale("en").format("YYYYMMDD")
      );
      setDateArray(sortedArray);
    }
    refetch();
  }, [data?.getEvents]);

  let ParentId = accountDBCtx?.user?.parentId;
  const {
    data: userDB,
    loading: stuLoading,
    error,
  } = useQuery(QUERY_STUDENTS, {
    variables: {
      parentId: ParentId?._id,
    },
    onCompleted: ({ getStudentsByParents }) => {
      // console.log(getStudentsByParents, "test");
    },
    onError: (error) => {
      console.log(error.message, "Error");
    },
  });

  //
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
      } catch (error) {
        console.log(error);
      }
    }
  }, [academicData]);

  //
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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

  // console.log(dataArray, "dataArray");
  if (loading || stuLoading || refreshing) {
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
                  {t("ឆ្នាំសិក្សា") + " " + academicYear}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ top: 10 }}>
            <PartComponent title={t("ខែ តុលា ឆ្នាំ ២០២២")} />
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
