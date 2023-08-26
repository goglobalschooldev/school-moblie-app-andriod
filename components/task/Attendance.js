import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from "react-native";
import moment from "moment/moment";
import { MaterialIcons } from "@expo/vector-icons";
import localization from "moment/locale/km";
import { useTranslation, getLanguage } from "react-multi-lang";
import Header4 from "../../routes/header/Header4";
import { ATT_BY_STUDENT } from "../../graphql/get_AttByStudent";
import AttendanceList from "./AttendanceList";
import graphQLClient from "../../config/endpoint_2";

const Attendance = ({ navigation, route }) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const { sectionShift } = route?.params;
  const [attByStudent, setAttByStudent] = useState("");
  const [loading, setLoading] = useState(true);
  const [attLimit, setAttLimit] = useState(10);
  const t = useTranslation();

  console.log(sectionShift, "sectionShift");

  useEffect(() => {
    async function fetchData() {
      try {
        const GetAttendantsByStudent = await graphQLClient.request(
          ATT_BY_STUDENT,
          {
            studentId: sectionShift?.studentId,
            from:
              startDate === ""
                ? ""
                : moment(startDate)
                    .locale("en", localization)
                    .format("YYYY-MM-DD"),
            to:
              endDate === ""
                ? ""
                : moment(endDate)
                    .locale("en", localization)
                    .format("YYYY-MM-DD"),
            limit: attLimit,
            classId: sectionShift?._id,
          }
        );
        // console.log(GetAttendantsByStudent, "GetAttendantsByStudent");
        if (GetAttendantsByStudent) {
          setLoading(false);
          // setAttByStudent(GetAttendantsByStudent?.getAttendantsByStudent);

          if (GetAttendantsByStudent !== undefined) {
            setAttByStudent(GetAttendantsByStudent?.getAttendantsByStudent);
          }
        }
      } catch (error) {
        console.log(error.message, "errorGetAttendantsByStudent");
        setLoading(true);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, [startDate, endDate, attLimit]);

  // console.log(attByStudent, "attStu");

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
      // await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const StudentHeader = () => {
    if (getLanguage() === "en") {
      return (
        <Text numberOfLines={1}>
          {sectionShift?.englishName}
          {t("វត្តមានរបស់")}
        </Text>
      );
    } else {
      return (
        <Text numberOfLines={1}>
          {t("វត្តមានរបស់")}{" "}
          {sectionShift?.lastName + " " + sectionShift?.firstName}
        </Text>
      );
    }
  };
  const handleLoadMore = () => {
    setTimeout(() => {
      setAttLimit(attLimit + 8);
    }, 2000);
  };

  if (attByStudent === "") {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }

  return (
    // <SafeAreaView className="flex-1 bg-background">
    //   <Header4 navigation={navigation} title={StudentHeader()} />
    //   {/* Body */}
    //   <View className="h-14 w-[97%] bg-background self-center my-2 flex-row justify-around items-center">
    //     <TouchableOpacity
    //       className="flex h-12 w-[43%] flex-row items-center justify-evenly bg-white rounded-lg self-center"
    //       style={{
    //         shadowColor: "#747373",
    //         shadowOffset: {
    //           width: 0,
    //           height: 3,
    //         },
    //         shadowOpacity: 0.2,
    //         shadowRadius: 4,

    //         elevation: 6,
    //       }}
    //       onPress={() => setIsStartDateVisible(!isStartDateVisible)}
    //     >
    //       <DateTimePickerModal
    //         isVisible={isStartDateVisible}
    //         mode="date"
    //         onConfirm={ConfirmStartDate}
    //         onCancel={hideStartDate}
    //       />
    //       <TextInput
    //         className="text-black text-sm leading-7 "
    //         placeholder="DD/MM/YYYY"
    //         editable={false}
    //         value={
    //           startDate === ""
    //             ? ""
    //             : moment(startDate)
    //                 .locale("en", localization)
    //                 .format("DD/MM/YYYY")
    //         }
    //       />
    //       <MaterialIcons name="date-range" size={24} color="#6E6E6E" />
    //     </TouchableOpacity>
    //     <Text className="justify-center items-center text-black text-sm font-kantunruy-regular p-1 top-1">
    //       {t("​ដល់")}
    //     </Text>
    //     <TouchableOpacity
    //       className="flex flex-row h-12 w-[43%] items-center justify-evenly bg-white rounded-lg"
    //       style={{
    //         shadowColor: "#747373",
    //         shadowOffset: {
    //           width: 0,
    //           height: 3,
    //         },
    //         shadowOpacity: 0.2,
    //         shadowRadius: 4,

    //         elevation: 6,
    //       }}
    //       onPress={() => setIsEndDateVisible(!isEndDateVisible)}
    //     >
    //       <DateTimePickerModal
    //         isVisible={isEndDateVisible}
    //         mode="date"
    //         onConfirm={ConfirmEndDate}
    //         onCancel={hideEndDate}
    //       />

    //       <TextInput
    //         className="text-black text-sm leading-7"
    //         placeholder="DD/MM/YYYY"
    //         editable={false}
    //         value={
    //           endDate === ""
    //             ? ""
    //             : moment(endDate)
    //                 .locale("en", localization)
    //                 .format("DD/MM/YYYY")
    //         }
    //       />

    //       <MaterialIcons name="date-range" size={24} color="#6E6E6E" />
    //     </TouchableOpacity>
    //   </View>

    //   <View className="flex-1 h-full w-full bg-white items-center">
    //     {/* <View className="flex flex-row h-12 w-[95%] bg-main rounded-lg items-center mt-2 justify-center">
    //       <View className=" w-[21%] border-r border-[#ffffff6c] justify-center items-center">
    //         <Text className="text-white font-bayon text-sm self-center leading-7">
    //           {t("កាលបរិច្ឆេទ")}
    //         </Text>
    //       </View>
    //       <View className="justify-center w-[30%] items-center border-r border-[#ffffff6c] self-center">
    //         <Text className="text-white font-bayon text-sm leading-7 items-center justify-center self-center">
    //           {t("ថ្នាក់រៀន")}
    //         </Text>
    //       </View>
    //       <View className=" justify-center w-[16%] items-center border-r border-[#ffffff6c]">
    //         <Text className="text-white font-bayon text-sm leading-7">ចូល</Text>
    //       </View>
    //       <View className=" justify-center w-[16%] items-center border-r border-[#ffffff6c]">
    //         <Text className="text-white font-bayon text-sm leading-7">ចេញ</Text>
    //       </View>
    //       <View className=" justify-center w-[17%] items-center">
    //         <Text className="text-white font-bayon text-sm leading-7">
    //           {t("ស្ថានភាព")}
    //         </Text>
    //       </View>
    //     </View> */}
    //     {/* <ScrollView
    //       scrollEventThrottle={10}
    //       contentContainerStyle={styles.scrollView}
    //       showsVerticalScrollIndicator={true}
    //       refreshControl={
    //         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //       }
    //     > */}
    //     {loading ? (
    //       <>
    //         <View className="flex-1 justify-center">
    //           <ActivityIndicator size="large" color="#EFB419" />
    //         </View>
    //       </>
    //     ) : (
    //       <>
    //         {attByStudent?.length === 0 ? (
    //           <View className="flex-1 h-[100%] w-full bg-white flex-col items-center justify-center">
    //             <Text className="text-gray font-kantunruy-regular">
    //               {t("មិនមានទិន្នន័យ")}
    //             </Text>
    //           </View>
    //         ) : (
    //           <>
    //             <FlatList
    //               data={attByStudent}
    //               keyExtractor={(item, index) => index}
    //               renderItem={({ item }) => (
    //                 <View className="flex flex-row h-fit w-[97%] bg-pink items-center border-b border-background self-center">
    //                   <View className="py-3 justify-center w-[21%] items-center">
    //                     <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                       {moment(item?.data)
    //                         .locale("en", localization)
    //                         .format("DD MMM YYYY")}
    //                     </Text>
    //                   </View>
    //                   <View className=" justify-center self-center w-[30%] items-center px-1">
    //                     <Text
    //                       className="text-black font-kantunruy-regular text-xs leading-6"
    //                       // numberOfLines={1}
    //                     >
    //                       {item?.classroom}
    //                     </Text>
    //                   </View>
    //                   <View className="py-3 justify-center w-[16%] items-center">
    //                     {item?.check_in === null ||
    //                     item?.check_in === "" ||
    //                     item?.check_in === undefined ? (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         --:--
    //                       </Text>
    //                     ) : (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         {item?.check_in}
    //                       </Text>
    //                     )}
    //                   </View>
    //                   <View className="py-3 justify-center w-[16%] items-center">
    //                     {item?.check_out === null ||
    //                     item?.check_out === "" ||
    //                     item?.check_out === undefined ? (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         --:--
    //                       </Text>
    //                     ) : (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         {item?.check_out}
    //                       </Text>
    //                     )}
    //                   </View>
    //                   <View className="py-3 justify-center w-[17%] items-center">
    //                     <Text
    //                       className={clsx(
    //                         "font-kantunruy-regular text-xs leading-6",
    //                         item?.status === "LATE"
    //                           ? "text-[#00AE50]"
    //                           : item?.status === "PRESENT"
    //                           ? "text-[#0000FD]"
    //                           : item?.status === "ABSENT"
    //                           ? "text-[#FD0002]"
    //                           : item?.status === "PERMISSION"
    //                           ? "text-[#FEBE00]"
    //                           : "text-black"
    //                       )}
    //                     >
    //                       {item?.status === "LATE"
    //                         ? t("យឺត")
    //                         : item?.status === "PRESENT"
    //                         ? t("វត្តមាន")
    //                         : item?.status === "ABSENT"
    //                         ? t("អវត្តមាន")
    //                         : item?.status === "PERMISSION"
    //                         ? t("សុំច្បាប់")
    //                         : null}
    //                     </Text>
    //                   </View>
    //                 </View>
    //               )}
    //               // ListFooterComponent={
    //               //   attLimit === attLimit?.length ? (
    //               //     <TouchableOpacity
    //               //       className="items-center p-1 h-10 bg-red"
    //               //       onPress={() => handleLoadMore}
    //               //     >
    //               //       <Text className="text-sm font-kantunruy-regular text-main leading-10">
    //               //         {t("កំពុងដំណើរការ")}
    //               //       </Text>
    //               //     </TouchableOpacity>
    //               //   ) : null
    //               // }
    //               vertical={true}
    //               showsVerticalScrollIndicator={false}
    //               snapToAlignment={"center"}
    //               decelerationRate={"fast"}
    //             />
    //             {/* <View className="h-screen pt-2 pb-5">
    //               {attByStudent?.map((item, index) => (
    //                 <View
    //                   className="flex flex-row h-fit w-[97%] bg-white items-center border-b border-background self-center"
    //                   key={index}
    //                 >
    //                   <View className="py-3 justify-center w-[21%] items-center">
    //                     <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                       {moment(item?.data)
    //                         .locale("en", localization)
    //                         .format("DD MMM YYYY")}
    //                     </Text>
    //                   </View>
    //                   <View className=" justify-center self-center w-[30%] items-center px-1">
    //                     <Text
    //                       className="text-black font-kantunruy-regular text-xs leading-6"
    //                       // numberOfLines={1}
    //                     >
    //                       {item?.classroom}
    //                     </Text>
    //                   </View>
    //                   <View className="py-3 justify-center w-[16%] items-center">
    //                     {item?.check_in === null ||
    //                     item?.check_in === "" ||
    //                     item?.check_in === undefined ? (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         --:--
    //                       </Text>
    //                     ) : (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         {item?.check_in}
    //                       </Text>
    //                     )}
    //                   </View>
    //                   <View className="py-3 justify-center w-[16%] items-center">
    //                     {item?.check_out === null ||
    //                     item?.check_out === "" ||
    //                     item?.check_out === undefined ? (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         --:--
    //                       </Text>
    //                     ) : (
    //                       <Text className="text-black font-kantunruy-regular text-xs leading-6">
    //                         {item?.check_out}
    //                       </Text>
    //                     )}
    //                   </View>
    //                   <View className="py-3 justify-center w-[17%] items-center">
    //                     <Text
    //                       className={clsx(
    //                         "font-kantunruy-regular text-xs leading-6",
    //                         item?.status === "LATE"
    //                           ? "text-[#00AE50]"
    //                           : item?.status === "PRESENT"
    //                           ? "text-[#0000FD]"
    //                           : item?.status === "ABSENT"
    //                           ? "text-[#FD0002]"
    //                           : item?.status === "PERMISSION"
    //                           ? "text-[#FEBE00]"
    //                           : "text-black"
    //                       )}
    //                     >
    //                       {item?.status === "LATE"
    //                         ? t("យឺត")
    //                         : item?.status === "PRESENT"
    //                         ? t("វត្តមាន")
    //                         : item?.status === "ABSENT"
    //                         ? t("អវត្តមាន")
    //                         : item?.status === "PERMISSION"
    //                         ? t("សុំច្បាប់")
    //                         : null}
    //                     </Text>
    //                   </View>
    //                 </View>
    //               ))}
    //             </View> */}
    //             {attLimit === attByStudent?.length ? (
    //               <TouchableOpacity
    //                 className="items-center p-2 pb-5 bg-red"
    //                 onPress={() => setAttLimit(attLimit + 5)}
    //               >
    //                 <Text className="text-base font-gothic text-main">
    //                   {t("មើលបន្ថែម")}
    //                 </Text>
    //               </TouchableOpacity>
    //             ) : null}
    //           </>
    //         )}
    //       </>
    //     )}
    //     {/* </ScrollView> */}
    //   </View>
    // </SafeAreaView>
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        <Header4 navigation={navigation} title={StudentHeader()} />
      </SafeAreaView>

      <View className="h-14 w-[97%] bg-background self-center my-2 flex-row justify-between items-center">
        <TouchableOpacity
          className="flex h-12 w-[43%] flex-row items-center justify-evenly bg-white rounded-lg self-center"
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
            className="text-black text-sm leading-7 "
            placeholder="DD-MM-YYYY"
            editable={false}
            value={
              startDate === ""
                ? ""
                : moment(startDate)
                    .locale("en", localization)
                    .format("DD-MM-YYYY")
            }
          />
          <MaterialIcons name="date-range" size={24} color="#6E6E6E" />
        </TouchableOpacity>
        <Text className="justify-center items-center text-black text-sm font-kantunruy-regular p-1 top-1">
          {t("​ដល់")}
        </Text>
        <TouchableOpacity
          className="flex flex-row h-12 w-[43%] items-center justify-evenly bg-white rounded-lg"
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
            className="text-black text-sm leading-7"
            placeholder="DD-MM-YYYY"
            editable={false}
            value={
              endDate === ""
                ? ""
                : moment(endDate)
                    .locale("en", localization)
                    .format("DD-MM-YYYY")
            }
          />

          <MaterialIcons name="date-range" size={24} color="#6E6E6E" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row h-12 w-[97%] bg-main rounded-lg items-center mt-2 justify-center self-center">
        <View className=" w-[21%] border-r border-[#ffffff6c] justify-center items-center">
          <Text className="text-white font-bayon text-sm self-center leading-7">
            {t("កាលបរិច្ឆេទ")}
          </Text>
        </View>
        <View className="justify-center w-[30%] items-center border-r border-[#ffffff6c] self-center">
          <Text className="text-white font-bayon text-sm leading-7 items-center justify-center self-center">
            {t("ថ្នាក់រៀន")}
          </Text>
        </View>
        <View className=" justify-center w-[16%] items-center border-r border-[#ffffff6c]">
          <Text className="text-white font-bayon text-sm leading-7">ចូល</Text>
        </View>
        <View className=" justify-center w-[16%] items-center border-r border-[#ffffff6c]">
          <Text className="text-white font-bayon text-sm leading-7">ចេញ</Text>
        </View>
        <View className=" justify-center w-[17%] items-center">
          <Text className="text-white font-bayon text-sm leading-7">
            {t("ស្ថានភាព")}
          </Text>
        </View>
      </View>

      <View className="flex-1 w-full h-screen bg-white">
        {loading ? (
          <>
            <View className="flex-1 justify-center">
              <ActivityIndicator size="large" color="#EFB419" />
            </View>
          </>
        ) : (
          <>
            {attByStudent?.length === 0 ? (
              <View className="flex h-[70%] w-full bg-white flex-col items-center justify-center">
                <Text className="text-gray font-kantunruy-regular">
                  {t("មិនមានទិន្នន័យ")}
                </Text>
              </View>
            ) : (
              <FlatList
                data={attByStudent.slice(0, attLimit)}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <AttendanceList {...item} />}
                onEndReached={handleLoadMore}
                ListFooterComponent={
                  attLimit === attByStudent?.length ? (
                    <TouchableOpacity
                      className="items-center"
                      onPress={() => handleLoadMore}
                    >
                      <Text className="text-sm font-kantunruy-regular text-main leading-10">
                        {t("កំពុងដំណើរការ")}
                      </Text>
                    </TouchableOpacity>
                  ) : null
                }
                vertical={true}
                showsVerticalScrollIndicator={false}
                snapToAlignment={"center"}
                decelerationRate={"fast"}
              />
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "pink",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Attendance;
