import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../color";
import Root from "../../root";
import Header2 from "../../routes/header/Header2";
import { StyleController } from "../../static/styleProvider";
import ClassModal from "../modal/classModal";
import { getKhmerNumber } from "../../static/khmerNumber";
import { ACADEMIC_YEAR } from "../../graphql/gql_academicYear";
import { useQuery } from "@apollo/client/react";
import { ENROLLMENT_STUDENTS } from "../../graphql/gql_enrollmentByStudents";
import { useTranslation, getLanguage } from "react-multi-lang";
import PickupModal from "../modal/pickupModal";
import * as Location from "expo-location";
import ModalProminent from "../modal/modalProminent";
import LunchAttCard from "../LuchAttCard";
import AttCard from "../AttCard";
import LeaveCard from "../LeaveCard";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";

const StuClass = ({ navigation, route }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { data } = route.params;
  const [academicName, setAcademicName] = useState();
  const [academicYear, setAcademicYear] = useState();
  const [isAllow, setIsAllow] = useState(false);
  const t = useTranslation();
  const { studentDBCtxDispatch, enrollmentDBCtx, enrollmentDBCtxDispatch } =
    useContext(DataController);
  // console.log(data, "getStudenAttendancePermissionById");
  // console.log(enrollmentDBCtx[0]?.studentId,"enrollmentDBCtx")
  useEffect(() => {
    if (data) {
      studentDBCtxDispatch({
        type: ACTION.QUERY_STUDENT,
        payload: data,
      });
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        let status = await Location.getForegroundPermissionsAsync();
        // let backPerm = await Location.getBackgroundPermissionsAsync();
        if (status?.granted) {
          setIsAllow(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  const StudentName = () => {
    if (getLanguage() === "en") {
      return (
        <Text
          style={{
            fontSize: 14,
            color: COLORS.MAIN,
            fontFamily: "Bayon-Regular",
          }}
        >
          {data?.englishName} {t("ថ្នាក់រៀន")}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontSize: 14,
            color: COLORS.MAIN,
            fontFamily: "Bayon-Regular",
          }}
        >
          {t("ថ្នាក់រៀន")} {data?.lastName + " " + data?.firstName}
        </Text>
      );
    }
  };

  const PickupStu = () => {
    if (getLanguage() === "en") {
      return (
        <Text
          style={{
            fontSize: 14,
            color: COLORS.MAIN,
            fontFamily: "Bayon-Regular",
          }}
        >
          {t("ទទួល")} {data?.englishName}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontSize: 14,
            color: COLORS.MAIN,
            fontFamily: "Bayon-Regular",
          }}
        >
          {t("ទទួល")} {data?.lastName + " " + data?.firstName}
        </Text>
      );
    }
  };

  const StuAttLunch = () => {
    if (getLanguage() === "en") {
      return (
        <Text
          style={{
            fontSize: 14,
            color: COLORS.MAIN,
            fontFamily: "Bayon-Regular",
          }}
        >
          {data?.englishName} {t("វត្តមានការញ៉ាំអាហាររបស់")}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontSize: 14,
            color: COLORS.MAIN,
            fontFamily: "Bayon-Regular",
          }}
        >
          {t("វត្តមានការញ៉ាំអាហាររបស់")}{" "}
          {data?.lastName + " " + data?.firstName}
        </Text>
      );
    }
  };

  //
  const {
    data: enrollmentStudent,
    loading: enrollmentLoading,
    errors,
    refetch: enrollmentRefetch,
  } = useQuery(ENROLLMENT_STUDENTS, {
    variables: {
      studentId: data?._id,
    },
    onCompleted: ({ getEvents }) => {
      // console.log(getEvents, "test");
    },
    onError: (error) => {
      console.log(error.message, "error stuClass");
    },
  });
  let enrollStudent = enrollmentStudent?.getEnrollmentByStudents;

  useEffect(() => {
    if (enrollmentStudent) {
      enrollmentRefetch();
      enrollmentDBCtxDispatch({
        type: ACTION.ENROLLMENT_STUDENTS,
        payload: enrollmentStudent?.getEnrollmentByStudents,
      });
    }
  }, [enrollmentStudent]);

  // ========== check shift of student ===================
  const [arrayShiftData, setArrayShiftData] = useState([]);
  useEffect(() => {
    if (enrollmentStudent?.getEnrollmentByStudents) {
      let shiftData = [];
      enrollmentStudent?.getEnrollmentByStudents?.forEach((elem) => {
        let newRow = {
          shiftId: elem?.shiftId,
          shiftName: (elem?.shiftName).split("")[0],
        };
        shiftData.push(newRow);
      });
      setArrayShiftData(shiftData);
    }
  }, [enrollStudent]);

  // console.log(arrayShiftData)

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

  if (enrollmentLoading || academicLoading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  if (!isAllow) {
    return (
      <View>
        <ModalProminent setAlertPopup={setIsAllow} />
      </View>
    );
  }

  if (!enrollmentLoading && !academicLoading) {
    return (
      <Root
        Header={
          <Header2
            title={t("ឆ្នាំសិក្សា") + " " + academicYear}
            navigation={navigation}
          />
        }
      >
        <View
          style={{
            width: width * 0.95,
            alignSelf: "center",
            paddingTop: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              position: "relative",
              alignSelf: "center",
            }}
          >
            <View style={{ height: 25, justifyContent: "center" }}>
              <View
                style={{
                  height: 1,
                  width: width * 0.95,
                  backgroundColor: COLORS.MAIN,
                }}
              />
            </View>
            <View style={{ alignItems: "baseline", position: "absolute" }}>
              <View style={{ backgroundColor: "white", paddingRight: 8 }}>
                {StudentName()}
              </View>
            </View>
          </View>
          <View>
            <ClassModal navigation={navigation} data={enrollStudent} />
            {/* <ClassSheet data={enrollStudent}/> */}
          </View>
          {enrollStudent?.map((item) => {
            if (item?.classGroupNameEn === "ECE") {
              return (
                <View key={item?.studentId}>
                  <View
                    style={{
                      flex: 1,
                      // position: "relative",
                      alignSelf: "center",
                      top: 15,
                    }}
                  >
                    <View style={{ height: 25, justifyContent: "center" }}>
                      <View
                        style={{
                          height: 1,
                          width: width * 0.95,
                          backgroundColor: COLORS.MAIN,
                        }}
                      />
                    </View>
                    <View
                      style={{ alignItems: "baseline", position: "absolute" }}
                    >
                      <View
                        style={{ backgroundColor: "white", paddingRight: 8 }}
                      >
                        {PickupStu()}
                      </View>
                    </View>
                  </View>
                  <PickupModal data={data} />
                </View>
              );
            }
          })}

          <View
            style={{
              flex: 1,
              position: "relative",
              alignSelf: "center",
              marginTop: 15,
            }}
          >
            <View style={{ height: 25, justifyContent: "center" }}>
              <View
                style={{
                  height: 1,
                  width: width * 0.95,
                  backgroundColor: COLORS.MAIN,
                }}
              />
            </View>
            <View style={{ alignItems: "baseline", position: "absolute" }}>
              <View style={{ backgroundColor: "white", paddingRight: 8 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.MAIN,
                    fontFamily: "Bayon-Regular",
                  }}
                >
                  {t("ស្នើសុំច្បាប់")}
                </Text>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate("RecordAttendance", {
                data: enrollStudent,
                otherParam: arrayShiftData,
              })
            }
          >
            <AttCard />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LeaveScreen", { data: enrollStudent })
            }
          >
            <LeaveCard />
          </TouchableOpacity>
          {/* <View
            style={{
              flex: 1,
              position: "relative",
              alignSelf: "center",
              top: 15,
            }}
          >
            <View style={{ height: 25, justifyContent: "center" }}>
              <View
                style={{
                  height: 1,
                  width: width * 0.95,
                  backgroundColor: COLORS.MAIN,
                }}
              />
            </View>
            <View style={{ alignItems: "baseline", position: "absolute" }}>
              <View style={{ backgroundColor: "white", paddingRight: 8 }}>
                {StuAttLunch()}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{ paddingTop: 20 }}
            // onPress={() => {
            //   navigation?.navigate("LunchAtt", {
            //     attendanceData: selectData,
            //   });
            // }}
          >
            <LunchAttCard />
          </TouchableOpacity> */}
        </View>
      </Root>
    );
  }
};

export default StuClass;
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
