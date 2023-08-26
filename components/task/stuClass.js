import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { COLORS } from "../../color";
import Header2 from "../../routes/header/Header2";
import { StyleController } from "../../static/styleProvider";
import ClassModal from "../modal/classModal";
import { getKhmerNumber } from "../../static/khmerNumber";
import {
  ACADEMIC_YEAR,
  ALL_ACADEMIC_YEAR,
} from "../../graphql/gql_academicYear";
import { useQuery } from "@apollo/client/react";
import { ENROLLMENT_STUDENTS } from "../../graphql/gql_enrollmentByStudents";
import { useTranslation, getLanguage } from "react-multi-lang";
import PickupModal from "../modal/pickupModal";
import * as Location from "expo-location";
import ModalProminent from "../modal/modalProminent";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";
import { SECTION_SHIFT_BY_STUDENT } from "../../graphql/get_SectionShiftByStudent";
import graphQLClient from "../../config/endpoint_2";
import SelectDropdown from "react-native-select-dropdown";
import { GET_CLASSES_BY_STU } from "../../graphql/get_ClassesByStudent";

const StuClass = ({ navigation, route }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { data } = route.params;
  const [academicName, setAcademicName] = useState();
  const [academicYear, setAcademicYear] = useState();
  const [isAllow, setIsAllow] = useState(false);
  const t = useTranslation();
  const { studentDBCtxDispatch, enrollmentDBCtxDispatch } =
    useContext(DataController);
  const [loading, setLoading] = useState(true);
  const [sectionShift, setSectionShift] = useState("");
  const [loadingTime, setLoadingTime] = useState(true);
  const [academicYearData, setAcademicYearData] = useState();
  const [academicSelected, setAcademicSelected] = useState("");
  const [classesByStu, setClassesByStu] = useState("");

  // console.log(data, "data");
  useEffect(() => {
    async function fetchData() {
      try {
        const GetAcademicYear = await graphQLClient.request(ALL_ACADEMIC_YEAR);
        // console.log(GetAcademicYear, "GetAcademicYear");
        if (GetAcademicYear) {
          setLoadingTime(false);
          if (GetAcademicYear !== undefined) {
            setAcademicYearData(GetAcademicYear?.getAcademicYear);
          }
        }
      } catch (error) {
        console.log(error.message, "errorGetStuTransportationAtt");
        setLoadingTime(true);
      }
    }
    fetchData();
  }, []);
  // console.log(data, "data");
  useEffect(() => {
    async function fetchData() {
      try {
        const GetClassesByStu = await graphQLClient.request(
          GET_CLASSES_BY_STU,
          {
            studentId: data?._id,
            academicYearId: academicSelected?._id,
          }
        );
        // console.log(GetClassesByStu, "GetClassesByStu");
        setClassesByStu(GetClassesByStu?.getClassesByStudentForMobile);
        // if (GetClassesByStu) {
        //   setLoadingTime(false);
        //   if (GetClassesByStu !== undefined) {
        //     setAcademicYearData(GetClassesByStu?.getAcademicYear);
        //   }
        // }
      } catch (error) {
        console.log(error.message, "errorGetStuTransportationAtt");
        // setLoadingTime(true);
      }
    }
    fetchData();
  }, []);

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    async function fetchData() {
      try {
        const getSectionShift = await graphQLClient?.request(
          SECTION_SHIFT_BY_STUDENT,
          {
            studentId: data?._id,
          }
        );
        // console.log(getSectionShift, "getSectionShift");
        if (getSectionShift !== undefined) {
          setSectionShift(getSectionShift?.getSectionShiftByStudent);
        }
      } catch (error) {
        console.log(error.message, "errorGetSectionShift");
        setLoading(true);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, [data?._id]);
  // console.log(sectionShift,"section")

  //old query
  // const {
  //   data: enrollmentStudent,
  //   loading: enrollmentLoading,
  //   errors,
  //   refetch: enrollmentRefetch,
  // } = useQuery(ENROLLMENT_STUDENTS, {
  //   variables: {
  //     studentId: data?._id,
  //   },
  //   onCompleted: ({ getEvents }) => {
  //     // console.log(getEvents, "test");
  //   },
  //   onError: (error) => {
  //     console.log(error.message, "error stuClass");
  //   },
  // });
  // let enrollStudent = enrollmentStudent?.getEnrollmentByStudents;

  // useEffect(() => {
  //   if (enrollmentStudent) {
  //     enrollmentRefetch();
  //     enrollmentDBCtxDispatch({
  //       type: ACTION.ENROLLMENT_STUDENTS,
  //       payload: enrollmentStudent?.getEnrollmentByStudents,
  //     });
  //   }
  // }, [enrollmentStudent]);

  // ========== check shift of student ===================
  // const [arrayShiftData, setArrayShiftData] = useState([]);
  // useEffect(() => {
  //   if (enrollmentStudent?.getEnrollmentByStudents) {
  //     let shiftData = [];
  //     enrollmentStudent?.getEnrollmentByStudents?.forEach((elem) => {
  //       let newRow = {
  //         shiftId: elem?.shiftId,
  //         shiftName: (elem?.shiftName).split("")[0],
  //       };
  //       shiftData.push(newRow);
  //     });
  //     setArrayShiftData(shiftData);
  //   }
  // }, [enrollStudent]);

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

  if (academicLoading || loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  if (!isAllow) {
    return (
      <>
        <ModalProminent setAlertPopup={setIsAllow} />
      </>
    );
  }

  if (!academicLoading) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        />
        <SafeAreaView className="bg-white">
          <Header2
            title={t("ឆ្នាំសិក្សា") + " " + academicYear}
            navigation={navigation}
          />
        </SafeAreaView>
        <View className="flex-row bg-white h-fit px-2 py-2 justify-between">
          {/* <View className="w-[40%] justify-center">
            <Text className="font-kantunruy-regular text-sm text-main leading-7">
              ឆ្នាំសិក្សា
            </Text>
          </View> */}
          <View className="w-[100%]">
            <SelectDropdown
              data={academicYearData}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, "selectedItem");
                setAcademicSelected(selectedItem);
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              // dropdownIconPosition="right"
              renderDropdownIcon={(status) => {
                return (
                  <>
                    <View className="p-4 ">
                      <Image
                        source={require("../../assets/Images/angle-down-gray.png")}
                        className="h-4 w-4"
                        transform={[{ scaleY: -1 }]}
                      />
                    </View>
                  </>
                );
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View className="flex-1 flex-row justify-end items-center px-2 rounded-lg">
                    <Text className="flex-1 text-sm w-full py-2 text-[#444444]">
                      {selectedItem ? (
                        <Text className="text-[13px] font-kantunruy-regular text-black">
                          {getLanguage() === "en"
                            ? selectedItem?.academicYear
                            : selectedItem?.academicYearInKhmer}
                        </Text>
                      ) : (
                        <Text className="text-[13px] font-kantunruy-regular text-[#A9A9A9]">
                          ជ្រើសរើសឆ្នាំសិក្សា
                        </Text>
                      )}
                    </Text>
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View className="flex-1 flex-row justify-start items-center px-2">
                    <Text className="text-black text-start text-[13px] font-kantunruy-regular leading-6">
                      {getLanguage() === "en"
                        ? item?.academicYear
                        : item?.academicYearInKhmer}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View className="flex-1 w-full h-screen bg-white">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="w-[95%] h-fit self-center pt-2">
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
                <ClassModal navigation={navigation} data={classesByStu} />
                {/* <ClassSheet data={enrollStudent}/> */}
              </View>
              {sectionShift?.map((item, index) => {
                if (
                  item?.classGroupCode === "ECE" ||
                  item?.classGroupNameEn === "Early Childhood Education"
                ) {
                  return (
                    <View key={index}>
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
                          style={{
                            alignItems: "baseline",
                            position: "absolute",
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "white",
                              paddingRight: 8,
                            }}
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

              {/* <View
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RecordAttendance", {
                    data: enrollStudent,
                    otherParam: arrayShiftData,
                  })
                }
              >
                <AttCard />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("LeaveScreen", { data: enrollStudent })
                }
              >
                <LeaveCard />
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
};

export default StuClass;
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    justifyContent: "center",
  },
  dropdown3BtnStyle: {
    width: "100%",
    height: 47,
    backgroundColor: "white",
    paddingHorizontal: 0,
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown3DropdownStyle: { backgroundColor: "white", borderRadius: 10 },
  dropdown3RowStyle: {
    backgroundColor: "white",
    borderBottomColor: "#c7c7c757",
    height: 47,
  },
});
