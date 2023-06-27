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
      // console.log(getStudentsByParents, "test");
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

  if (loading || academicLoading || refreshing) {
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
          {/* {AcademicYear()} */}
          <Header
            title={t("ឆ្នាំសិក្សា") + " " + academicYear}
            navigation={navigation}
          />
        </SafeAreaView>
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
          <View
            style={{
              width: width,
              height: height,
              backgroundColor: COLORS.WHITE,
            }}
          >
            <View
              style={{
                width: width,
                alignSelf: "center",
                height: height * 0.29,
                backgroundColor: COLORS.WHITE,
                flexDirection: "column",
                justifyContent: "center",
                paddingTop: 5,
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
                    {dataSubUser.map((load) => (
                      <TouchableOpacity
                        key={load?._id}
                        onPress={
                          () =>
                            // navigation.navigate("StuClass", {
                            //   data: load,
                            //   otherParam: distance,
                            // })
                          navigation.navigate("StuClass", { data: load})
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
        </ScrollView>
      </>
    );
  }
};

export default Tasks;

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
