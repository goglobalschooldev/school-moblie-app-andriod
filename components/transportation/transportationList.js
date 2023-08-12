import {
  View,
  Text,
  TextInput,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Header4 from "../../routes/header/Header4";
import Root from "../../root";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { t } from "react-multi-lang";
import { useQuery } from "@apollo/client";
import localization from "moment/locale/km";
import moment from "moment/moment";
import { GET_STU_TRAN_ATT } from "../../graphql/get_stuTranAtt";
import { GraphQLClient } from "graphql-request";
import { useEffect } from "react";

const TransportationList = ({ navigation, route }) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [attLimit, setAttLimit] = useState(10);
  const [loadingTime, setLoadingTime] = useState(true);
  const [stuTranAtt, setStuTranAtt] = useState([]);

  const { data } = route.params;
  const { studentId } = route.params;

  const URI = "192.168.2.30:4300/graphql";
  const graphQLClient = new GraphQLClient(`http://${URI}`);

  useEffect(() => {
    async function fetchData() {
      try {
        const getStuTransportationAtt = await graphQLClient.request(
          GET_STU_TRAN_ATT,
          {
            studentId: data?._id || studentId,
            limit: attLimit,
            page: 1,
            start:
              startDate === ""
                ? ""
                : moment(startDate)
                    .locale("en", localization)
                    .format("YYYY-MM-DD"),
            end:
              endDate === ""
                ? ""
                : moment(endDate)
                    .locale("en", localization)
                    .format("YYYY-MM-DD"),
            busId: "",
          }
        );

        if (getStuTransportationAtt) {
          setLoadingTime(false);
          setStuTranAtt(
            getStuTransportationAtt?.getStudentTransportationAttendancePagination
          );
        }
      } catch (error) {
        console.log(error.message, "errorGetStuTransportationAtt");
        setLoadingTime(true);
      }
    }
    fetchData();
  }, []);

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
      // await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // if (loading) {
  //   return (
  //     <View className="flex-1 justify-center">
  //       <ActivityIndicator size="large" color="#EFB419" />
  //     </View>
  //   );
  // }
  return (
    <Root
      Header={
        <Header4 navigation={navigation} title={"Transportation Attendance"} />
      }
    >
      <View className="flex-1 bg-background">
        <View className="h-[6%] w-[97%] bg-background self-center my-2 flex-row justify-around items-center">
          <TouchableOpacity
            className="flex h-full w-[43%] flex-row items-center justify-around bg-white rounded-lg self-center"
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
            ដល់
          </Text>
          <TouchableOpacity
            className="flex flex-row h-full w-[43%] items-center justify-around bg-white rounded-lg"
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
          <View className="flex flex-row h-[7%] w-[95%] bg-main rounded-lg items-center mt-2">
            <View className="h-full w-[34%] border-r border-[#ffffff6c] justify-center items-center ">
              <Text className="text-white font-bayon text-sm self-center p-1">
                {t("កាលបរិច្ឆេទ")}
              </Text>
            </View>
            <View className="justify-center h-full w-[33%] items-center border-r border-[#ffffff6c] self-center ">
              <Text className="text-white font-bayon text-sm p-1 items-center justify-center self-center">
                {t("យកមកសាលា")}
              </Text>
            </View>
            <View className=" justify-center h-full w-[33%] items-center ">
              <Text className="text-white font-bayon text-sm p-1">
                {t("ជូនទៅផ្ទះ")}
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
                <View className="pt-2 pb-2 w-[97%] self-center">
                  {stuTranAtt?.data?.map((item, index) => (
                    // console.log(index, "index")
                    <View
                      className="flex flex-row h-12 w-[97%] bg-white  items-center border-b border-background self-center"
                      key={index}
                    >
                      <View className="h-full justify-center w-[34%] items-center">
                        <Text className="text-black font-kantunruy-regular text-xs">
                          {moment(item?.date)
                            ?.locale("en", localization)
                            ?.format("DD MMM YYYY")}
                        </Text>
                      </View>

                      <View className="flex flex-row h-full w-[100%] bg-white   items-center self-center">
                        <View className="h-12 justify-around w-[33%] items-center flex-col">
                          <Text className="text-black font-kantunruy-regular text-xs">
                            {item?.checkIn !== "" && item?.checkIn !== null
                              ? item?.checkIn
                              : "---:---"}
                          </Text>
                        </View>
                        <View className="h-12 justify-around w-[33%] items-center flex-col">
                          <Text className="text-black font-kantunruy-regular text-xs">
                            {item?.checkOut !== "" && item?.checkOut !== null
                              ? item?.checkOut
                              : "---:---"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
                {attLimit === stuTranAtt?.data?.length ? (
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
    width: "100%",
    height: "100%",
  },
});

export default TransportationList;
