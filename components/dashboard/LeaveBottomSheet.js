import React, { useContext, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";
import LeaveCard from "../LeaveCard";
import StudentClass from "../StudentClass";
import { ENROLLMENT_STUDENTS } from "../../graphql/gql_enrollmentByStudents";
import { useQuery } from "@apollo/client";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import localization from "moment/locale/km";
import { getLanguage, useTranslation } from "react-multi-lang";
import { CREATE_LEAVE } from "../../graphql/newLeave";
import { Platform } from "react-native";
import graphQLClient from "../../config/endpoint_2";

export default function LeaveBottomSheet({ navigation, dataSubUser }) {
  const { styleState, height, width } = useContext(StyleController);
  const [student, setStudent] = useState();
  const [shift, setShift] = useState();
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState(
    moment().locale("en", localization).format("YYYY-MM-DD")
  );
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [endDate, setEndDate] = useState(
    moment().locale("en", localization).format("YYYY-MM-DD")
  );
  const [reason, onChangeReason] = useState("");
  const [requestField, setRequestField] = useState(false);
  const [disable, setDisable] = useState(false);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const t = useTranslation();

  const openSheet2 = (value) => {
    setStudent(value);
    refRBSheet1.current.close(); // close sheet 1
    refRBSheet2.current.open(); // open sheet 2
  };

  const {
    data: enrollmentStudent,
    loading,
    errors,
    refetch,
  } = useQuery(ENROLLMENT_STUDENTS, {
    variables: {
      studentId: student?._id,
    },
    onCompleted: ({ getEnrollmentByStudents }) => {
      // console.log(getEnrollmentByStudents, "test");
    },
    onError: (error) => {
      console.log(error.message, "error stuClass");
    },
  });
  // console.log(shift, "shift");
  const ConfirmStartDate = (date) => {
    setStartDate(moment(date).locale("en", localization).format("YYYY-MM-DD"));
    setIsStartDateVisible(!isStartDateVisible);
    setEndDate(moment(date).locale("en", localization).format("YYYY-MM-DD"));
  };

  const hideStartDate = () => {
    setIsStartDateVisible(!isStartDateVisible);
  };

  const ConfirmEndDate = (date) => {
    setEndDate(moment(date).locale("en", localization).format("YYYY-MM-DD"));
    setIsEndDateVisible(!isEndDateVisible);
  };

  const hideEndDate = () => {
    setIsEndDateVisible(!isEndDateVisible);
  };

  useEffect(() => {
    if (
      startDate === "" ||
      endDate === "" ||
      reason === "" ||
      shift?.academicYearId === undefined ||
      shift?.classId === undefined ||
      shift?.studentId === undefined ||
      shift?.gradeId === undefined
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    startDate,
    endDate,
    reason,
    shift?.academicYearId,
    shift?.classId,
    shift?.studentId,
    shift?.gradeId,
  ]);

  const handleCreateLeave = async () => {
    let create = false;
    const BreakException = {};
    try {
      if (
        startDate === "" ||
        endDate === "" ||
        reason === "" ||
        shift?.academicYearId === undefined ||
        shift?.classId === undefined ||
        shift?.studentId === undefined ||
        shift?.gradeId === undefined
      ) {
        setRequestField(true);
        create = false;
        throw BreakException;
      } else {
        setRequestField(false);
        onChangeReason("");
        setStartDate(moment().locale("en", localization).format("YYYY-MM-DD"));
        setEndDate(moment().locale("en", localization).format("YYYY-MM-DD"));
        create = true;
      }
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    const newValue = {
      academicYearId: shift?.academicYearId,
      gradeId: [
        {
          classes: shift?.classId,
          grade: shift?.gradeId,
        },
      ],
      from: startDate,
      reason: reason,
      studentId: shift?.studentId,
      to: endDate,
    };

    if (endDate < startDate) {
      Alert.alert(
        t("សូមពិនិត្យមើលម្ដងទៀត"),
        t("ថ្ងៃដែលអ្នកជ្រើសរើសមិនត្រឹមត្រូវទេ!")
      );
      create = false;
    }
    if (create) {
      async function fetchData() {
        try {
          const CreateLeave = await graphQLClient.request(CREATE_LEAVE, {
            input: {
              ...newValue,
            },
          });
          console.log(CreateLeave, "createLeave");
          if (CreateLeave?.createLeave?.status) {
            refRBSheet2.current.close();
          }
        } catch (error) {
          console.log(error.message, "errorCreateLeave");
          // setLoadingTime(true);
          // setParentDataCheck(false);
        }
      }
      fetchData();
    }
  };

  if (loading || dataSubUser === undefined) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  return (
    <>
      <TouchableOpacity onPress={() => refRBSheet1.current.open()}>
        <LeaveCard />
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(24,23,23,0.7374300061821604) 10%",
          },
          draggableIcon: {
            backgroundColor: "#a8a8aa",
          },
          container: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: 10,
            elevation: 5,
            paddingBottom: 20,
          },
        }}
        animationType="fade"
        height={height * 0.5}
      >
        <View
          style={{
            flex: 1,
            width: width * 0.95,
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <View className="justify-center">
            <Text className="leading-7 py-1 font-bayon text-base text-main">
              {t("ការស្នើសុំច្បាប់របស់សិស្ស")}
            </Text>
          </View>
          <View className="h-fit">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="self-center items-center w-[90%] pb-5 pt-2">
                {dataSubUser?.map((load, index) => (
                  <TouchableOpacity
                    key={load?._id}
                    onPress={() => {
                      openSheet2(load);
                    }}
                  >
                    <StudentClass
                      {...load}
                      // data={load}
                      bgColor={
                        index % 2 == 0 ? COLORS.BLUE_LIGHT : COLORS.ORANGE_LIGHT
                      }
                      color={
                        index % 2 == 0 ? COLORS.BLUE_DARK : COLORS.ORANGE_DARK
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        onClose={() => refRBSheet1.current.close()}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(24,23,23,0.7374300061821604) 10%",
          },
          draggableIcon: {
            backgroundColor: "#a8a8aa",
          },
          container: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: 10,
            elevation: 5,
            paddingBottom: 20,
          },
        }}
        animationType="fade"
        height={height * 0.6}
      >
        <View
          style={{
            flex: 1,
            width: width * 0.95,
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <View className="justify-center self-center w-[95%]">
            {getLanguage() === "en" ? (
              <Text className="leading-7 py-1 font-bayon text-base text-main">
                {t("ការស្នើសុំច្បាប់របស់សិស្ស ")}
                {student?.englishName}
              </Text>
            ) : (
              <Text className="leading-7 py-1 font-bayon text-base text-main">
                {t("ការស្នើសុំច្បាប់របស់សិស្ស ")}
                {student?.lastName + " " + student?.firstName}
              </Text>
            )}
          </View>
          <View className="h-fit w-[95%] self-center">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="w-full pb-5 pt-2 flex-col">
                <Text className="font-kantunruy-regular text-sm leading-6 text-main py-1">
                  {t("ជ្រើសរើសថ្នាក់រៀន")}
                </Text>
                <SelectDropdown
                  data={enrollmentStudent?.getEnrollmentByStudents}
                  onFocus={refetch}
                  // onBlur={loading}
                  onSelect={(selectedItem, index) => {
                    setShift(selectedItem);
                    // console.log(selectedItem, "selectedItem");
                  }}
                  buttonStyle={styles.dropdown3BtnStyle}
                  // dropdownIconPosition="right"
                  renderDropdownIcon={(status) => {
                    return (
                      <>
                        {status ? (
                          <View className="p-4 ">
                            <Image
                              source={require("../../assets/Images/angle-down-gray.png")}
                              className="h-4 w-4"
                              transform={[{ scaleY: -1 }]}
                            />
                          </View>
                        ) : (
                          <View className="p-4">
                            <Image
                              source={require("../../assets/Images/angle-down-gray.png")}
                              className="h-4 w-4"
                            />
                          </View>
                        )}
                      </>
                    );
                  }}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View className="flex-1 flex-row justify-end items-center px-2 rounded-lg">
                        <Text className="flex-1 text-sm w-full py-2 text-[#444444]">
                          {selectedItem ? (
                            <Text className="text-[13px] font-kantunruy-regular text-black">
                              {selectedItem?.gradeName +
                                " " +
                                selectedItem?.className}
                            </Text>
                          ) : (
                            <Text className="text-[13px] font-kantunruy-regular text-[#A9A9A9]">
                              {t("ជ្រើសរើសថ្នាក់រៀន")}
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
                          {item?.gradeName + " " + item?.className}
                        </Text>
                      </View>
                    );
                  }}
                />
                <Text className="font-kantunruy-regular text-sm leading-6 text-main py-1">
                  {t("កាលបរិច្ឆេទ")}
                </Text>
                <View
                  className="w-full rounded-lg flex-row justify-between"
                  style={{ borderColor: "#cccccc", borderWidth: 1 }}
                >
                  <View className="flex-row">
                    <TouchableOpacity
                      className="p-2"
                      onPress={() => setIsStartDateVisible(!isStartDateVisible)}
                    >
                      <DateTimePickerModal
                        isVisible={isStartDateVisible}
                        mode="date"
                        onConfirm={ConfirmStartDate}
                        onCancel={hideStartDate}
                        minimumDate={
                          Platform.OS === "android" ? new Date() : undefined
                        }
                      />
                      <TextInput
                        className="text-black text-[13px] text-center rounded-md p-[0.7] px-2 bg-[#3b6efc31]"
                        editable={false}
                        value={moment(startDate)
                          .locale("en", localization)
                          .format("DD MMM YYYY")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="p-2"
                      onPress={() => setIsEndDateVisible(!isEndDateVisible)}
                    >
                      <DateTimePickerModal
                        isVisible={isEndDateVisible}
                        mode="date"
                        onConfirm={ConfirmEndDate}
                        onCancel={hideEndDate}
                        minimumDate={
                          Platform.OS === "android" ? new Date() : undefined
                        }
                      />
                      <TextInput
                        className="text-black text-[13px] text-center rounded-md p-[0.7] px-2 bg-[#3b6efc31]"
                        editable={false}
                        value={moment(endDate)
                          .locale("en", localization)
                          .format("DD MMM YYYY")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View className="items-center self-center justify-end pr-4">
                    <Image
                      source={require("../../assets/Images/calendar-clock-permission.png")}
                      className="h-5 w-5"
                    />
                  </View>
                </View>
                <Text className="font-kantunruy-regular text-sm leading-6 text-main py-1">
                  {t("មូលហេតុ")}
                </Text>

                <TextInput
                  className="text-black text-[13px] font-kantunruy-regular pt-1 pl-1 w-[100%] p-2 h-fit rounded-lg"
                  style={{ borderColor: "#cccccc", borderWidth: 1 }}
                  placeholder={t("សូមសរសេរមូលហេតុ")}
                  editable
                  multiline={true}
                  value={reason}
                  onChangeText={(text) => onChangeReason(text)}
                  keyboardType="default"
                  // autoFocus={true}
                />
                {disable ? (
                  <TouchableOpacity
                    className="bg-main p-3 items-center justify-center rounded-lg my-5"
                    onPress={() => handleCreateLeave()}
                  >
                    <Text className="text-[#ffffff] font-bayon text-base leading-7">
                      {t("ស្នើសុំច្បាប់")}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity className="bg-[#999999b2] p-3 items-center justify-center rounded-lg my-5">
                    <Text className="text-[#ffffff] font-bayon text-base leading-7">
                      {t("ស្នើសុំច្បាប់")}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </RBSheet>
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
  dropdown3BtnStyle: {
    width: "100%",
    height: 47,
    backgroundColor: "white",
    paddingHorizontal: 0,
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdown3DropdownStyle: { backgroundColor: "white", borderRadius: 10 },
  dropdown3RowStyle: {
    backgroundColor: "white",
    borderBottomColor: "#c7c7c757",
    height: 47,
  },
});
