import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native";
import { COLORS } from "../../color";
import Header2 from "../../routes/header/Header2";
import { StyleController } from "../../static/styleProvider";
import ClassModal from "../modal/classModal";
import { useTranslation, getLanguage } from "react-multi-lang";
import PickupModal from "../modal/pickupModal";
import * as Location from "expo-location";
import ModalProminent from "../modal/modalProminent";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";
import graphQLClient from "../../config/endpoint_2";
import SelectDropdown from "react-native-select-dropdown";
import { GET_ACADEMICYEARFORSELECT } from "../../graphql/getAcademicYearsForSelect";
import { GET_CLASSESBYSTUDENTFORMOBILE } from "../../graphql/GetClassesByStudentForMobile";
import { CHECK_ISSTUDENTINPICKUP } from "../../graphql/CheckIsStudentInPickUp";

const StuClass = ({ navigation, route }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { data } = route.params;
  const [isAllow, setIsAllow] = useState(false);
  const t = useTranslation();
  const { studentDBCtxDispatch } = useContext(DataController);
  const [loading, setLoading] = useState(true);
  const [academicYearForSelect, setAcademicYearForSelect] = useState([]);
  const [academicSelected, setAcademicSelected] = useState("");
  const [classesByStu, setClassesByStu] = useState([]);
  const [activeAcademicYear, setActiveAcademicYear] = useState({});
  const [checkIsStudentInPickUp, setCheckIsStudentInPickUp] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const CheckIsStudentInPickUp = await graphQLClient.request(
          CHECK_ISSTUDENTINPICKUP,
          {
            studentId: data?._id,
          }
        );
        if (CheckIsStudentInPickUp) {
          // console.log(CheckIsStudentInPickUp);
          setCheckIsStudentInPickUp(
            CheckIsStudentInPickUp?.checkIsStudentInPickUp
          );
        }
      } catch (error) {
        console.log(error.message, "Error CheckIsStudentInPickUp");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const GetAcademicYearsForSelect = await graphQLClient.request(
          GET_ACADEMICYEARFORSELECT
        );
        if (GetAcademicYearsForSelect) {
          setLoading(false);
          const activeObj =
            GetAcademicYearsForSelect?.getAcademicYearsForSelect?.find(
              (item) => item.status === true
            );
          if (activeObj) {
            setActiveAcademicYear(activeObj);
          }
          setAcademicYearForSelect(
            GetAcademicYearsForSelect?.getAcademicYearsForSelect
          );
        }
      } catch (error) {
        console.log(error.message, "Error GetAcademicYearsForSelect");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const GetClassesByStudentForMobile = await graphQLClient.request(
          GET_CLASSESBYSTUDENTFORMOBILE,
          {
            studentId: data?._id,
            academicYearId: academicSelected
              ? academicSelected
              : activeAcademicYear?._id,
          }
        );
        setClassesByStu(
          GetClassesByStudentForMobile?.getClassesByStudentForMobile
        );
      } catch (error) {}
    }
    fetchData();
  }, [academicSelected, activeAcademicYear]);

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

  if (loading) {
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

  if (activeAcademicYear) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        />
        <SafeAreaView className="bg-white">
          <Header2
            title={t("ទំព័រដើម")}
            navigation={navigation}
            stuData={data}
          />
        </SafeAreaView>
        <View className="flex-row h-fit px-2  justify-between bg-white">
          <View className="w-[100%]">
            <SelectDropdown
              data={academicYearForSelect}
              onSelect={(selectedItem, index) => {
                setAcademicSelected(selectedItem?._id);
              }}
              buttonStyle={styles.dropdown3BtnStyle}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View className="flex-1 flex-row justify-start items-center rounded-lg">
                    <Text className="text-[16px] font-bayon text-[#3C6EFB] pr-2">
                      ឆ្នាំសិក្សា៖
                    </Text>
                    <Text className="text-[#444444]">
                      {selectedItem ? (
                        <Text className="text-[13px] font-kantunruy-regular text-[#3C6EFB]">
                          {getLanguage() === "en"
                            ? selectedItem?.academicYearTitle
                            : selectedItem?.academicYearTitle}
                        </Text>
                      ) : (
                        <Text className="text-[13px] font-kantunruy-regular text-[#3C6EFB]">
                          {activeAcademicYear?.academicYearTitle}
                        </Text>
                      )}
                    </Text>
                    <View className="pl-2">
                      <Image
                        source={require("../../assets/Images/unfold.png")}
                        className="h-4 w-4"
                        transform={[{ scaleY: -1 }]}
                      />
                    </View>
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View className="flex-1 flex-row justify-start items-center px-2">
                    <Text className="text-[#3C6EFB] text-start text-[13px] font-kantunruy-regular leading-6">
                      {getLanguage() === "en"
                        ? item?.academicYearTitle
                        : item?.academicYearTitle}
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
              <View>
                <ClassModal
                  navigation={navigation}
                  data={classesByStu}
                  stuId={data}
                  academicId={
                    academicSelected
                      ? academicSelected
                      : activeAcademicYear?._id
                  }
                />
              </View>
              {checkIsStudentInPickUp ? (
                <View>
                  <View
                    style={{
                      flex: 1,
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
              ) : null}
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
    height: 40,
    backgroundColor: "white",
    paddingHorizontal: 0,
    alignItems: "center",
  },
  dropdown3DropdownStyle: { backgroundColor: "white", borderRadius: 10 },
  dropdown3RowStyle: {
    backgroundColor: "white",
    borderBottomColor: "#c7c7c757",
    height: 47,
  },
});
