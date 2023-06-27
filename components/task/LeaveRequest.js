import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useCallback, useState, useEffect, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import Root from "../../root";
import RequestDate from "../RequestDate";
import localization from "moment/locale/km";
import Header4 from "../../routes/header/Header4";
import { CREATE_PERMISSION } from "../../graphql/createPermisson";
import { DataController } from "../../context/Provider";
import { STUDENT_SHIFT } from "../../graphql/gql_GetShiftStudent";
import { useTranslation } from "react-multi-lang";
// import { ShiftType } from "../../static/getShiftType"

const LeaveRequest = ({ navigation, route }) => {
  const { accountDBCtx, studentsDBCtx, enrollmentDBCtx } =
    useContext(DataController);
  const [reason, onChangeReason] = React.useState("");
  const [requestField, setRequestField] = useState(false);
  const [shiftID, setShiftID] = useState("");
  const [shiftType, setShiftType] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().locale("en", localization).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().locale("en", localization).format("YYYY-MM-DD")
  );
  const [stuID, setStuID] = useState();

  const { enrollment } = route?.params || {};
  const t = useTranslation();

  // console.log(enrollmentDBCtx,"enrollmentDBCtx")
  useEffect(() => {
    enrollmentDBCtx?.forEach((element) => {
      setStuID(element?.studentId);
    });
  }, [enrollmentDBCtx]);

  // ====================== get Shift Type Data ======================

  const { data, refetch, loading } = useQuery(STUDENT_SHIFT, {
    variables: {
      stuId:
        stuID !== undefined && stuID !== "" && stuID !== null ? stuID : null,
    },
    onCompleted: ({ getShiftByStudentId }) => {
      if (getShiftByStudentId) {
        let rows = [
          {
            shiftId: null,
            shiftName: "Full Day",
          },
        ];
        getShiftByStudentId?.map((row) => {
          const allRows = {
            shiftId: row?.shiftId,
            shiftName: row?.shiftName,
          };
          rows.push(allRows);
        });
        setShiftType(rows);
      }
    },
    onError: (error) => {
      console.log("getShift==>", error.message);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  // const arr = [{ id: 2, name: "Bobby" }];
  // const obj = { id: 1, name: "Alice" };

  // arr.push(obj);
  // // 👇️ [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bobby' }]
  // console.log(arr, "arr");

  const [createPermission] = useMutation(CREATE_PERMISSION, {
    onCompleted: ({ createPermission }) => {
      // console.log(createPermission, "createPermission");
      if (createPermission?.success) {
        navigation.navigate("RequestDetail", { dataDetail: createPermission });
      } else {
        Alert.alert("Already request", createPermission?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    },
    onError: (e) => {
      console.log(e.message, "createError");
    },
  });

  const handleCreateLeave = async () => {
    let create = false;

    const BreakException = {};
    try {
      if (
        startDate === "" ||
        endDate === "" ||
        reason === ""
        // ||
        // shiftID === ""
      ) {
        setRequestField(true);
        create = false;
        throw BreakException;
      } else {
        setRequestField(false);
        create = true;
      }
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    const newValue = {
      studentId: stuID,
      startDate: startDate,
      endDate: endDate,
      reason: reason,
      shiftId: shiftID || null,
      parentId: accountDBCtx?.user?.parentId?._id,
    };

    if (create) {
      await createPermission({
        variables: {
          newData: {
            ...newValue,
          },
        },
        update(_, result) {
          // console.log(result, "result")
        },
      });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  return (
    <Root
      Header={<Header4 title={t("ស្នើសុំច្បាប់")} navigation={navigation} />}
    >
      <View className="w-full h-screen bg-background">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <>
            <View className="flex h-screen w-[95%] bg-background items-center self-center rounded-b-md">
              <View className="flex h-14 w-full flex-row mt-4 items-center justify-between bg-white p-2 rounded-md shadow-sm shadow-[#747373]">
                <View className="flex flex-row w-[65%] items-center">
                  <View className="p-2 bg-main rounded-md">
                    <Image
                      source={require("../../assets/Images/calendar-xmark-white.png")}
                      className="h-5 w-5"
                    />
                  </View>
                  <Text className="mx-2 text-sm font-kantunruy-regular text-black pt-1">
                    {t("ប្រភេទនៃថ្ងៃឈប់សម្រាក")}
                  </Text>
                </View>

                <View className="flex w-[35%]">
                  <SelectDropdown
                    data={shiftType}
                    onFocus={refetch}
                    onSelect={(selectedItem, index) => {
                      // setFieldTouched("type_timeoff", selectedItem?._id);
                      // console.log(selectedItem, "selectedItem");
                      setShiftID(selectedItem?.shiftId);
                    }}
                    buttonStyle={styles.dropdown3BtnStyle}
                    renderCustomizedButtonChild={(selectedItem, index) => {
                      return (
                        <View style={styles.dropdown3BtnChildStyle}>
                          <Text style={styles.dropdown3BtnTxt}>
                            {selectedItem ? (
                              <Text className="text-sm font-kantunruy-regular text-gray">
                                {selectedItem?.shiftName}
                              </Text>
                            ) : (
                              <Text className="text-sm font-kantunruy-regular text-[#A9A9A9]">
                                {t("ជ្រើសរើសប្រភេទ")}
                              </Text>
                            )}
                          </Text>
                          <Image
                            source={require("../../assets/Images/angle-down.png")}
                            className="h-4 w-4"
                          />
                        </View>
                      );
                    }}
                    dropdownStyle={styles.dropdown3DropdownStyle}
                    rowStyle={styles.dropdown3RowStyle}
                    renderCustomizedRowChild={(item, index) => {
                      return (
                        <View style={styles.dropdown3RowChildStyle}>
                          <Text style={styles.dropdown3RowTxt}>
                            {item?.shiftName}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
              <View className="w-full items-end h-5 ">
                {/* {shiftID === "" && requestField && (
                  <Text className="text-xs text-[#f73f3f] mx-2 font-kantunruy-regular pt-1">
                    {t("ទាមទារប្រភេទនៃថ្ងៃឈប់សម្រាក")}
                  </Text>
                )} */}
              </View>
              <View>
                <RequestDate
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex"
              >
                <View className="flex h-14 w-full flex-row items-start justify-between bg-white p-2 rounded-md shadow-sm shadow-[#747373]">
                  <View className="w-[12%] flex-row items-center">
                    <View className="p-2 bg-main rounded-md">
                      <Image
                        source={require("../../assets/Images/edit-white.png")}
                        className="h-5 w-5"
                      />
                    </View>
                  </View>

                  <View className="flex w-[88%] flex-row items-center">
                    <TextInput
                      className="text-black text-sm font-kantunruy-regular pt-1 pl-1 w-[100%] h-10"
                      placeholder={t("មូលហេតុ")}
                      editable
                      multiline={true}
                      value={reason}
                      onChangeText={(text) => onChangeReason(text)}
                      keyboardType="default"
                      // autoFocus={true}
                    />
                  </View>
                </View>
                <View className="w-full items-end h-4">
                  {reason === "" && requestField && (
                    <Text className="text-xs text-[#f73f3f] mx-2 font-kantunruy-regular pt-1">
                      {t("ទាមទារមូលហេតុ")}
                    </Text>
                  )}
                </View>
              </KeyboardAvoidingView>

              <TouchableOpacity
                className="flex w-full h-12 bg-main rounded-xl absolute bottom-[140] items-center justify-center"
                onPress={handleCreateLeave}
              >
                <Text className="font-bayon text-lg text-white pt-1">
                  {t("ស្នើសុំ")}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </ScrollView>
      </View>
    </Root>
  );
};
const styles = StyleSheet.create({
  dropdown3BtnStyle: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    paddingHorizontal: 0,
    alignItems: "center",
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    // backgroundColor:"red"
  },
  dropdown3BtnImage: { width: 18, height: 18 },
  dropdown3BtnTxt: {
    color: "#444",
    textAlign: "center",
    fontSize: 14,
    // marginHorizontal: 10,
    width: "100%",
    padding: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  dropdown3DropdownStyle: { backgroundColor: "white" },
  dropdown3RowStyle: {
    backgroundColor: "white",
    borderBottomColor: "#c7c7c757",
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdownRowImage: { width: 18, height: 18 },
  dropdown3RowTxt: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
    marginHorizontal: 12,
  },
  switchText: {
    paddingTop: Platform.OS === "ios" ? 0 : 12,
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  input: {
    paddingRight: 10,
    lineHeight: 23,
    flex: 2,
    textAlignVertical: "top",
    // height:20,
    backgroundColor: "red",
  },
});

export default LeaveRequest;
