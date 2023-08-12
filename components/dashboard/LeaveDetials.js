import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Header2 from "../../routes/header/Header2";
import { getLanguage, useTranslation } from "react-multi-lang";
import moment from "moment";
import tailwind from "twrnc";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import localization from "moment/locale/km";
import { GraphQLClient } from "graphql-request";
import { GET_LEAVE_BYID } from "../../graphql/newLeave";

const LeaveDetials = ({ navigation, route }) => {
  const [leaveNoti, setLeaveNoti] = useState("");
  const [loadingTime, setLoadingTime] = useState(true);
  const t = useTranslation();
  const { data } = route.params;
  const { notiData } = route.params;

  // console.log(data, "data");

  const URI = "192.168.2.30:4300/graphql";
  const graphQLClient = new GraphQLClient(`http://${URI}`);

  useEffect(() => {
    setTimeout(() => {
      setLoadingTime(false);
    }, 1000);
    async function fetchData() {
      try {
        const getLeaveById = await graphQLClient?.request(GET_LEAVE_BYID, {
          id: notiData?.navigetId,
        });
        // console.log(getLeaveById, "getLeaveById");
        if (getLeaveById !== undefined) {
          setLeaveNoti(getLeaveById?.getLeaveByID);
          // setLoadingTime(false);
        }
      } catch (error) {
        // console.log(error.message, "errorGetLeaveById");
        // setLoadingTime(true);
      }
    }
    fetchData();
  }, []);
  // console.log(leaveNoti, "leaveNoti");

  if (loadingTime) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }

  if (notiData !== undefined && notiData !== "") {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header2 navigation={navigation} title={t("ការស្នើសុំច្បាប់")} />
        <View className="flex-1 h-screen w-full bg-white self-center relative mt-2 px-2">
          <View className="flex flex-row justify-between h-9 border-b border-[#c7c7c72a] items-center">
            <Text className="text-xs font-kantunruy-regular text-gray p-2 items-center justify-center">
              {t("ថ្ងៃស្នើសុំសម្រាក")}
            </Text>
            <Text className="text-xs font-kantunruy-regular text-gray p-2 items-center justify-center">
              {getLanguage() === "en"
                ? moment(leaveNoti?.createdAt)
                    .locale("en", localization)
                    .format("LLL")
                : moment(leaveNoti?.createdAt)
                    .locale("km", localization)
                    .format("LLL")}
            </Text>
          </View>

          <View className="h-20 border-b border-[#c7c7c72a] items-center justify-center">
            <View className="w-[96%] h-fit bg-blue-thin self-center flex-row rounded-tl-sm rounded-bl-sm">
              <View className="w-[2%] bg-blue rounded-tl-sm rounded-bl-sm" />
              <View className=" flex-col justify-around">
                {leaveNoti?.from === leaveNoti?.to ? (
                  <Text className="text-sm font-kantunruy-regular p-1 leading-6">
                    {getLanguage() === "en"
                      ? moment(leaveNoti?.from)
                          .locale("en", localization)
                          .format("DD MMM, YYYY")
                      : moment(leaveNoti?.from)
                          .locale("km", localization)
                          .format("DD MMM, YYYY")}
                  </Text>
                ) : (
                  <Text className="text-sm font-kantunruy-regular p-1 leading-6">
                    {getLanguage() === "en"
                      ? moment(leaveNoti?.from)
                          .locale("en", localization)
                          .format("DD MMM, YYYY")
                      : moment(leaveNoti?.from)
                          .locale("km", localization)
                          .format("DD MMM, YYYY")}{" "}
                    -{" "}
                    {getLanguage() === "en"
                      ? moment(leaveNoti?.to)
                          .locale("en", localization)
                          .format("DD MMM, YYYY")
                      : moment(leaveNoti?.to)
                          .locale("km", localization)
                          .format("DD MMM, YYYY")}
                  </Text>
                )}
                <View className="flex-row">
                  <Text className="text-xs font-kantunruy-regular p-1 leading-5">
                    {t("ថ្នាក់រៀន")}
                    {" :"}
                  </Text>
                  {leaveNoti?.classes?.map((ele, index) => (
                    <Text
                      className="text-xs font-kantunruy-regular p-1 leading-5"
                      key={index}
                    >
                      {ele?.grade + " " + ele?.classes}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View className="border-b border-[#c7c7c72a] items-center justify-center">
            <View className="w-[96%] h-fit flex-col justify-center my-2">
              <Text
                className="text-xs text-gray font-kantunruy-regular"
                style={tailwind`my-2 android:my-1`}
              >
                {t("មូលហេតុ")}
              </Text>
              <Text className="text-sm text-black font-kantunruy-regular p-1 leading-6">
                {leaveNoti?.reason}
              </Text>
            </View>
          </View>
          <View className="border-b border-[#c7c7c72a] items-center justify-center">
            <View className="w-[96%] h-fit flex-col justify-center my-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-xs text-gray font-kantunruy-light my-1">
                  {t("ស្ថានភាព")}
                </Text>
              </View>
              <View className="flex flex-row items-center h-9">
                {leaveNoti?.status === "pending" ? (
                  <View className="flex-row w-[100%] items-center self-center">
                    <AntDesign
                      name="exclamationcircleo"
                      size={18}
                      color="#D6A400"
                      className="items-center"
                    />
                    <Text className="mx-2 text-sm self-center text-[#D6A400] items-center font-kantunruy-regular p-1 top-0.5">
                      {leaveNoti?.status}
                    </Text>
                  </View>
                ) : leaveNoti?.status === "approved" ? (
                  <View className="flex-row w-[100%] items-center self-center">
                    <Feather
                      name="check-circle"
                      size={18}
                      color="#3ab731"
                      className="items-center"
                    />
                    <Text className="mx-2 text-sm self-center text-[#3ab731] items-center font-kantunruy-regular p-1 top-0.5">
                      {leaveNoti?.status}
                    </Text>
                  </View>
                ) : (
                  <View className="flex-row w-[100%] items-center self-center">
                    <Entypo
                      name="circle-with-cross"
                      size={18}
                      color="red"
                      className="items-center"
                    />
                    <Text className="mx-2 text-sm self-center text-red items-center font-kantunruy-regular p-1 top-0.5">
                      {leaveNoti?.status}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header2 navigation={navigation} title={t("ការស្នើសុំច្បាប់")} />
      <View className="flex-1 h-screen w-full bg-white self-center relative mt-2 px-2">
        <View className="flex flex-row justify-between h-9 border-b border-[#c7c7c72a] items-center">
          <Text className="text-xs font-kantunruy-regular text-gray p-2 items-center justify-center">
            {t("ថ្ងៃស្នើសុំសម្រាក")}
          </Text>
          <Text className="text-xs font-kantunruy-regular text-gray p-2 items-center justify-center">
            {moment(data?.createdAt).locale("en", localization).format("LLL")}
          </Text>
        </View>

        <View className="h-20 border-b border-[#c7c7c72a] items-center justify-center">
          <View className="w-[96%] h-fit bg-blue-thin self-center flex-row rounded-tl-sm rounded-bl-sm">
            <View className="w-[2%] bg-blue rounded-tl-sm rounded-bl-sm" />
            <View className="flex-col justify-evenly">
              {data?.from === data?.to ? (
                <Text className="text-sm font-kantunruy-regular my-1 p-1">
                  {moment(data?.from)
                    .locale("en", localization)
                    .format("DD MMM, YYYY")}
                </Text>
              ) : (
                <Text className="text-sm font-kantunruy-regular my-1 p-1">
                  {moment(data?.from)
                    .locale("en", localization)
                    .format("DD MMM, YYYY")}{" "}
                  -{" "}
                  {moment(data?.to)
                    .locale("en", localization)
                    .format("DD MMM, YYYY")}
                </Text>
              )}
              <View className="flex-row">
                <Text className="text-xs font-kantunruy-regular p-1 leading-5">
                  {t("ថ្នាក់រៀន")}
                  {" :"}
                </Text>
                {data?.classes?.map((item, index) => (
                  <Text
                    className="text-xs font-kantunruy-regular leading-5 p-1"
                    key={index}
                  >
                    {item?.grade + " " + item?.classes}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View className="border-b border-[#c7c7c72a] items-center justify-center">
          <View className="w-[96%] h-fit flex-col justify-center my-2">
            <Text
              className="text-xs text-gray font-kantunruy-regular"
              style={tailwind`my-2 android:my-1`}
            >
              {t("មូលហេតុ")}
            </Text>
            <Text className="text-sm text-black font-kantunruy-regular p-1 leading-6">
              {data?.reason}
            </Text>
          </View>
        </View>
        <View className="border-b border-[#c7c7c72a] items-center justify-center">
          <View className="w-[96%] h-fit flex-col justify-center my-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-gray font-kantunruy-light my-1">
                {t("ស្ថានភាព")}
              </Text>
            </View>
            <View className="flex flex-row items-center h-9">
              {data?.status === "pending" ? (
                <View className="flex-row w-[100%] items-center self-center">
                  <AntDesign
                    name="exclamationcircleo"
                    size={18}
                    color="#D6A400"
                    className="items-center"
                  />
                  <Text className="mx-2 text-sm self-center text-[#D6A400] items-center font-kantunruy-regular p-1 top-0.5">
                    {data?.status}
                  </Text>
                </View>
              ) : data?.status === "approved" ? (
                <View className="flex-row w-[100%] items-center self-center">
                  <Feather
                    name="check-circle"
                    size={18}
                    color="#3ab731"
                    className="items-center"
                  />
                  <Text className="mx-2 text-sm self-center text-[#3ab731] items-center font-kantunruy-regular p-1 top-0.5">
                    {data?.status}
                  </Text>
                </View>
              ) : (
                <View className="flex-row w-[100%] items-center self-center">
                  <Entypo
                    name="circle-with-cross"
                    size={18}
                    color="red"
                    className="items-center"
                  />
                  <Text className="mx-2 text-sm self-center text-red items-center font-kantunruy-regular p-1 top-0.5">
                    {data?.status}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LeaveDetials;
