import {
  View,
  Text,
  TextInput,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useMemo, useState } from "react";
import Header4 from "../../routes/header/Header4";
import { TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { t } from "react-multi-lang";
import localization from "moment/locale/km";
import moment from "moment/moment";
import { GET_STU_TRAN_ATT } from "../../graphql/get_stuTranAtt";
import { useEffect } from "react";
import TransportationItem from "./transportationItem";
import graphQLClient from "../../config/endpoint_2";
import { COLORS } from "../../color";
import { Image } from "react-native";
import { Avatar } from "react-native-elements";

const TransportationList = ({ navigation, route }) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [attLimit, setAttLimit] = useState(10);
  const [loadingTime, setLoadingTime] = useState(true);
  const [stuTranAtt, setStuTranAtt] = useState([]);

  const { data, studentId } = route.params;

  useEffect(() => {
    async function fetchData() {
      try {
        const getStuTransportationAtt = await graphQLClient.request(
          GET_STU_TRAN_ATT,
          {
            studentId: data?._id || studentId,
            limit: attLimit,
            page: 1,
            start: startDate === "" ? "" : startDate,
            end: endDate === "" ? "" : endDate,
            busId: "",
          }
        );
        // console.log(getStuTransportationAtt, "getStuTransportationAtt");
        if (getStuTransportationAtt) {
          setLoadingTime(false);
          if (getStuTransportationAtt !== undefined) {
            setStuTranAtt(
              getStuTransportationAtt?.getStudentTransportationAttendancePagination
            );
          }
        }
      } catch (error) {
        console.log(error.message, "errorGetStuTransportationAtt");
        setLoadingTime(true);
      }
    }
    fetchData();
  }, [startDate, endDate]);

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

  const handleLoadMore = () => {
    setTimeout(() => {
      setAttLimit(attLimit + 8);
    }, 2000);
  };

  const StudentImage = useMemo(() => {
    const studentImage =
      "https://storage.go-globalschool.com/api" + data?.profileImg;
    if (
      studentImage === "https://storage.go-globalschool.com/api" ||
      null ||
      data?.profileImg === null
    ) {
      return (
        <Image
          resizeMode="cover"
          style={{
            height: 28,
            width: 28,
            borderRadius: 50,
            position: "absolute",
          }}
          source={require("../../assets/Images/student.png")}
        />
      );
    } else {
      return (
        <Image
          resizeMode="cover"
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            position: "absolute",
          }}
          source={{ uri: studentImage + "?time=" + new Date() }}
        />
      );
    }
  }, [data?.profileImg]);

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      {/* Header */}
      <SafeAreaView>
        <View className="bg-white w-full">
          <View className="w-full h-14 bg-white border-b-[#E4E4E4] shadow-sm self-center">
            <View className="flex-row items-center w-[95%] self-center">
              <View className="w-[70%] h-14 flex-row items-center">
                <TouchableOpacity
                  className="self-center"
                  onPress={() => navigation.goBack()}
                >
                  <MaterialIcons
                    name="arrow-back"
                    size={24}
                    style={{ color: COLORS.MAIN }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text className="font-bayon text-main text-[16px] mx-1">
                    {t("វត្តមានសិស្សជិះឡាន")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="w-[30%] h-14 flex-row items-center justify-end">
                <Avatar
                  size={30}
                  rounded
                  ImageComponent={() => StudentImage}
                  overlayContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      {/* DatePicker */}
      <View className="h-12 w-[97%] bg-background self-center my-2 flex-row justify-between items-center">
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
      {/* Head Table */}
      <View className="flex flex-row h-[7%] w-[97%] bg-main rounded-lg items-center mt-2 self-center">
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
      {/* body */}
      <View className="flex-1 w-full h-screen bg-white">
        {loadingTime ? (
          <>
            <View className="flex-1 justify-center">
              <ActivityIndicator size="large" color="#EFB419" />
            </View>
          </>
        ) : (
          <>
            {stuTranAtt?.data?.length === 0 ? (
              <View className="flex h-[70%] w-full bg-white flex-col items-center justify-center">
                <Text className="text-gray font-kantunruy-regular">
                  {t("មិនមានទិន្នន័យ")}
                </Text>
              </View>
            ) : (
              <>
                <FlatList
                  data={stuTranAtt?.data?.slice(0, attLimit)}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => <TransportationItem {...item} />}
                  onEndReached={handleLoadMore}
                  ListFooterComponent={
                    attLimit === stuTranAtt?.data?.length ? (
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
              </>
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
  },
});

export default TransportationList;
