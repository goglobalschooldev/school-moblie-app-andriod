import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import Root from "../../root";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native";
import moment from "moment/moment";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import localization from "moment/locale/km";
import { useTranslation, getLanguage } from "react-multi-lang";
import Header4 from "../../routes/header/Header4";
import { STUDENT_ATTENDANCE } from "../../graphql/gql_getStudentAtt";
import { useQuery } from "@apollo/client";

const RecordAttendance = ({ navigation, route }) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [attLimit, setAttLimit] = useState(10);
  const [refreshing, setRefreshing] = React.useState(false);
  const [stuID, setStuID] = useState();
  const { data } = route.params;
  const { otherParam } = route.params;
  const [stuAttanceData, setStuAttanceData] = useState([]);
  const shiftIDAfterNoon = "62e1fe1f3cdcd305193c1a98";
  const shiftIDMorning = "62e1fe173cdcd305193c183e";
  const [loadingTime, setLoadingTime] = useState(true);

  useEffect(() => {
    data?.forEach((element) => {
      setStuID(element);
    });
  }, [data]);

  // ========================== get data student attendance ======================
  const {
    data: attRecord,
    loading,
    refetch,
  } = useQuery(STUDENT_ATTENDANCE, {
    variables: {
      stuId: stuID?.studentId,
      startDate:startDate === "" ? null: moment(startDate).locale("en", localization).format("YYYY-MM-DD"),
      endDate: endDate === "" ? null: moment(endDate).locale("en", localization).format("YYYY-MM-DD"),
      limit: attLimit,
    },
    pollInterval: 2000,
    onCompleted: ({ getStudentAttendanceByStuId }) => {
      // console.log(getStudentAttendanceByStuId, "getStudentAttendanceByStuId");
      if (getStudentAttendanceByStuId?.length !== 0) {
        setStuAttanceData(getStudentAttendanceByStuId);
      } else {
        setStuAttanceData([]);
      }
      setLoadingTime(false);
    },
    onError: (error) => {
      setLoadingTime(true);
      console.log(error.message);
    },
  });

  // console.log(stuAttanceData, "attRecord");

  const t = useTranslation();
  var en = moment().locale("en", localization);

  const ConfirmStartDate = (date) => {
    setStartDate(new Date(date));
    setIsStartDateVisible(!isStartDateVisible);
  };

  const hideStartDate = () => {
    setIsStartDateVisible(!isStartDateVisible);
  };

  // end date
  const ConfirmEndDate = (date) => {
    setEndDate(new Date(date));
    setIsEndDateVisible(!isEndDateVisible);
  };

  const hideEndDate = () => {
    setIsEndDateVisible(!isEndDateVisible);
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refetch]);

  const StudentHeader = () => {
    if (getLanguage() === "en") {
      return (
        <Text numberOfLines={1}>
          {stuID?.englishName}
          {t("វត្តមានរបស់")}
        </Text>
      );
    } else {
      return (
        <Text numberOfLines={1}>
          {t("វត្តមានរបស់")} {stuID?.lastName + " " + stuID?.firstName}
        </Text>
      );
    }
  };

  const handleGetTimeShift = (timeshiftData, shiftID) => {
    if (timeshiftData?.length !== 0) {
      let dataFilter = timeshiftData?.filter((e) => e.shiftId === shiftID);
      if (dataFilter?.length !== 0) {
        return dataFilter;
      } else {
        return [
          {
            shiftId: "",
            morningCheckIn: null,
            morningCheckOut: null,
            afternoonCheckIn: null,
            afternoonCheckOut: null,
            status: "",
          },
        ];
      }
    } else {
      return [
        {
          shiftId: "",
          morningCheckIn: null,
          morningCheckOut: null,
          afternoonCheckIn: null,
          afternoonCheckOut: null,
          status: "",
        },
      ];
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
    <Root Header={<Header4 navigation={navigation} title={StudentHeader()} />}>
      <View className="flex-1 bg-background">
        <View className="h-14 w-[97%] bg-background self-center my-2 flex-row justify-around items-center">
          <TouchableOpacity
            className="flex h-12 w-[43%] flex-row items-center justify-around bg-white rounded-lg self-center"
            style={{
              shadowColor: "#747373",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 6,
            }}
            onPress={() => setIsStartDateVisible(!isStartDateVisible)}
          >
            <DateTimePickerModal
              isVisible={isStartDateVisible}
              mode="date"
              onConfirm={ConfirmStartDate}
              onCancel={hideStartDate}
            />
            <TextInput
              className="text-black text-sm "
              placeholder="DD/MM/YYYY"
              editable={false}
              value={
                startDate === ""
                  ? ""
                  : moment(startDate)
                      .locale("en", localization)
                      .format("DD/MM/YYYY")
              }
            />
            <MaterialIcons name="date-range" size={24} color="#6E6E6E" />
          </TouchableOpacity>
          <Text className="justify-center items-center text-black text-sm font-kantunruy-regular p-1 top-1">
            {t("​ដល់")}
          </Text>
          <TouchableOpacity
            className="flex flex-row h-12 w-[43%] items-center justify-around bg-white rounded-lg"
            style={{
              shadowColor: "#747373",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.2,
              shadowRadius: 4,

              elevation: 6,
            }}
            onPress={() => setIsEndDateVisible(!isEndDateVisible)}
          >
            <DateTimePickerModal
              isVisible={isEndDateVisible}
              mode="date"
              onConfirm={ConfirmEndDate}
              onCancel={hideEndDate}
            />

            <TextInput
              className="text-black text-sm"
              placeholder="DD/MM/YYYY"
              editable={false}
              value={
                endDate === ""
                  ? ""
                  : moment(endDate)
                      .locale("en", localization)
                      .format("DD/MM/YYYY")
              }
            />

            <MaterialIcons name="date-range" size={24} color="#6E6E6E" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 h-screen w-full bg-white items-center">
          <View className="flex flex-row h-12 w-[95%] bg-main rounded-lg items-center mt-2">
            <View className=" w-[24%] border-r border-[#ffffff6c] justify-center items-center">
              <Text className="text-white font-bayon text-sm self-center p-1">
                {t("កាលបរិច្ឆេទ")}
              </Text>
            </View>
            <View className="justify-center w-[24%] items-center border-r border-[#ffffff6c] self-center">
              <Text className="text-white font-bayon text-sm p-1 items-center justify-center self-center">
                {t("ពេលព្រឹក")}
              </Text>
            </View>
            <View className=" justify-center w-[24%] items-center border-r border-[#ffffff6c]">
              <Text className="text-white font-bayon text-sm p-1">
                {t("ពេលរសៀល")}
              </Text>
            </View>
            <View className=" justify-center w-[29%] items-center">
              <Text className="text-white font-bayon text-sm p-1">
                {t("ស្ថានភាព")}
              </Text>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#FCA845"]}
              />
            }
          >
            {loadingTime ? (
              <>
                <View className="flex-1 justify-center">
                  <ActivityIndicator size="large" color="#EFB419" />
                </View>
              </>
            ) : (
              <>
                {stuAttanceData?.length === 0 ? (
                  <View className="flex h-[70%] bg-white flex-col items-center justify-center">
                    <Text className="text-gray font-kantunruy-regular">
                      {t("មិនមានទិន្នន័យ")}
                    </Text>
                  </View>
                ) : (
                  <View className="pt-2 pb-2 w-[97%] self-center">
                    {stuAttanceData?.map((item) => (
                      <View
                        className="flex flex-row h-14 w-[97%] bg-white items-center border-b border-background self-center"
                        key={item?._id}
                      >
                        <View className="h-12 justify-center w-[24%] items-center">
                          <Text className="text-black font-kantunruy-regular text-xs">
                            {moment(item?.attendanceDate)
                              ?.locale("en", localization)
                              ?.format("DD MMM YYYY")}
                          </Text>
                        </View>

                        <View className="flex flex-row h-14 w-[100%] bg-white items-center border-b border-background self-center">
                          {/* moning  */}
                          {handleGetTimeShift(item?.info, shiftIDMorning) &&
                          handleGetTimeShift(item?.info, shiftIDMorning)[0]
                            ?.status === "PERMISSION" ? (
                            <View className="h-12 justify-around w-[24%] items-center flex-col">
                              <Text className="text-[#FEBE00] font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDMorning
                                )[0]?.morningCheckIn !== "" &&
                                handleGetTimeShift(
                                  item?.info,
                                  shiftIDMorning
                                )[0]?.morningCheckIn !== null
                                  ? moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDMorning
                                      )[0]?.morningCheckIn
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                              <Text className="text-[#FEBE00] font-kantunruy-bold text-xs">
                                -
                              </Text>
                              <Text className="text-[#FEBE00] font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDMorning
                                )[0]?.morningCheckOut
                                  ? moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDMorning
                                      )[0]?.morningCheckOut
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                            </View>
                          ) : (
                            <View className="h-12 justify-around w-[24%] items-center flex-col">
                              <Text className="text-black font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDMorning
                                )[0]?.morningCheckIn !== "" &&
                                handleGetTimeShift(
                                  item?.info,
                                  shiftIDMorning
                                )[0]?.morningCheckIn !== null
                                  ? moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDMorning
                                      )[0]?.morningCheckIn
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                              <Text className="text-black font-kantunruy-regular text-xs">
                                -
                              </Text>
                              <Text className="text-black font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDMorning
                                )[0]?.morningCheckOut
                                  ? moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDMorning
                                      )[0]?.morningCheckOut
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                            </View>
                          )}

                          {/* afternoon */}
                          {handleGetTimeShift(item?.info, shiftIDAfterNoon) &&
                          handleGetTimeShift(item?.info, shiftIDAfterNoon)[0]
                            .status === "PERMISSION" ? (
                            <View className="h-12 justify-around w-[24%] items-center flex-col">
                              <Text className="text-[#FEBE00] font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDAfterNoon
                                )[0]?.afternoonCheckIn
                                  ? // !== ""  && handleGetTimeShift(item?.info, shiftIDAfterNoon)[0]?.afternoonCheckIn !== null (ដាក់លក្ខខណ្ឌនេះ វាដើរម៉ោងម៉ាស៊ីន)
                                    moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDAfterNoon
                                      )[0]?.afternoonCheckIn
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                              <Text className="text-[#FEBE00] font-kantunruy-bold text-xs">
                                -
                              </Text>
                              <Text className="text-[#FEBE00] font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDAfterNoon
                                )?.afternoonCheckOut
                                  ? moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDAfterNoon
                                      )?.afternoonCheckOut
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                            </View>
                          ) : (
                            <View className="h-12 justify-around w-[24%] items-center flex-col">
                              <Text className="text-black font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDAfterNoon
                                )?.afternoonCheckIn
                                  ? moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDAfterNoon
                                      )?.afternoonCheckIn
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                              <Text className="text-black font-kantunruy-regular text-xs">
                                -
                              </Text>
                              <Text className="text-black font-kantunruy-regular text-xs">
                                {handleGetTimeShift(
                                  item?.info,
                                  shiftIDAfterNoon
                                )?.afternoonCheckOut
                                  ? moment(
                                      handleGetTimeShift(
                                        item?.info,
                                        shiftIDAfterNoon
                                      )?.afternoonCheckOut
                                    )
                                      .locale("en", localization)
                                      .format("HH:mm")
                                  : "--:--"}
                              </Text>
                            </View>
                          )}

                          <View className="h-12 justify-center w-[29%] items-center">
                            {otherParam?.map((element, indexshift) => (
                              <View key={indexshift}>
                                {handleGetTimeShift(
                                  item?.info,
                                  element?.shiftId
                                )[0]?.status === "PRESENT" ? (
                                  <Text className="text-[#0000FD] font-kantunruy-regular text-[11px] my-1">
                                    {element?.shiftName}.
                                    {
                                      handleGetTimeShift(
                                        item?.info,
                                        element?.shiftId
                                      )[0]?.status
                                    }
                                  </Text>
                                ) : handleGetTimeShift(
                                    item?.info,
                                    element?.shiftId
                                  )[0]?.status === "LATE" ? (
                                  <Text className="text-[#00AE50] font-kantunruy-regular text-[11px] my-1">
                                    {element?.shiftName}.
                                    {
                                      handleGetTimeShift(
                                        item?.info,
                                        element?.shiftId
                                      )[0]?.status
                                    }
                                  </Text>
                                ) : handleGetTimeShift(
                                    item?.info,
                                    element?.shiftId
                                  )[0]?.status === "PERMISSION" ? (
                                  <Text className="text-[#FEBE00] font-kantunruy-regular text-[11px] my-1">
                                    {element?.shiftName}.
                                    {
                                      handleGetTimeShift(
                                        item?.info,
                                        element?.shiftId
                                      )[0]?.status
                                    }
                                  </Text>
                                ) : handleGetTimeShift(
                                    item?.info,
                                    element?.shiftId
                                  )[0]?.status === "ABSENT" ? (
                                  <Text className="text-[#FD0002] font-kantunruy-regular text-[11px] my-1">
                                    {element?.shiftName}.
                                    {
                                      handleGetTimeShift(
                                        item?.info,
                                        element?.shiftId
                                      )[0]?.status
                                    }
                                  </Text>
                                ) : null}
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                {attLimit === stuAttanceData?.length ? (
                  <TouchableOpacity
                    className="items-center p-2 pb-5"
                    onPress={() => setAttLimit(attLimit + 5)}
                  >
                    <Text className="text-base font-gothic text-main">
                      {t("មើលបន្ថែម")}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Root>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default RecordAttendance;
