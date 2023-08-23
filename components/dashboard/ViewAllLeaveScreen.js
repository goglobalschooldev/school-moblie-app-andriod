import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header2 from "../../routes/header/Header2";
import { GET_LEAVE_PAGINATION } from "../../graphql/newLeave";
import { getLanguage, useTranslation } from "react-multi-lang";
import moment from "moment";
import localization from "moment/locale/km";
import { COLORS } from "../../color";
import clsx from "clsx";
import graphQLClient from "../../config/endpoint_2";

const ViewAllLeaveScreen = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [leaveData, setLeaveData] = useState("");
  const [leaveLimit, setLeaveLimit] = useState(10);
  const [loadingTime, setLoadingTime] = useState(true);
  const t = useTranslation();

  const { ParentId } = route.params;

  useEffect(() => {
    async function fetchData() {
      try {
        const getLeave = await graphQLClient?.request(GET_LEAVE_PAGINATION, {
          parentId: ParentId?._id,
          limit: leaveLimit,
        });
        // console.log(getLeave, "GetLeave");
        if (getLeave) {
          setTimeout(() => {
            setLoadingTime(false);
          }, 1000);
          if (getLeave !== undefined) {
            setLeaveData(getLeave?.getLeaveForMobile);
          }
        }
      } catch (error) {
        console.log(error.message, "errorGetLeave");
        // setLoadingTime(true);
        // setParentDataCheck(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, [leaveLimit]);
  // console.log(leaveData,"leave")

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      //   await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (refreshing || loadingTime) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header2 navigation={navigation} title={t("ការស្នើសុំច្បាប់")} />
      <View className="flex w-full bg-white items-center mb-12">
        <ScrollView
          scrollEventThrottle={10}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FCA845"]}
            />
          }
        >
          {leaveData?.length === 0 ? (
            <View className="flex h-fit bg-white flex-col items-center pt-[120%]">
              <Image
                source={require("../../assets/Images/hotel-bell.png")}
                className="h-28 w-28"
              />
              <Text className="font-kantunruy-bold text-sm mt-8 p-1">
                {t("មិនមានសំណើ")}
              </Text>
              <Text className="font-kantunruy-light text-gray">
                {t("សំណើនឹងបង្ហាញនៅទីនេះ")}
              </Text>
            </View>
          ) : (
            <>
              <View className="pt-1 pb-2 items-center">
                {leaveData?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className={clsx(
                      "h-fit w-[97%] rounded-xl flex-row justify-between items-center p-1 my-1 py-2",
                      index % 2 === 0 ? "bg-blue-thin" : "bg-orange-thin"
                    )}
                    onPress={() =>
                      navigation.navigate("LeaveDetials", { data: item })
                    }
                  >
                    <View className="flex w-[20%] items-center">
                      {item?.profileImg !== undefined ||
                      item?.profileImg !== null ? (
                        <Image
                          source={{
                            uri:
                              "https://storage.go-globalschool.com/api" +
                              item?.profileImg,
                          }}
                          className="h-14 w-14 rounded-full"
                          style={{
                            borderColor:
                              index % 2 === 0
                                ? COLORS.BLUE_DARK
                                : COLORS.ORANGE_DARK,
                            borderWidth: 0.5,
                          }}
                        />
                      ) : (
                        <Image
                          source={require("../../assets/Images/student.png")}
                          className="h-14 w-14 rounded-full"
                        />
                      )}
                    </View>
                    <View className="flex w-[80%] h-[90%]">
                      <View className="flex flex-col justify-evenly mx-1">
                        <View className="flex-row items-center">
                          <View className="pr-1">
                            {getLanguage() === "en" ? (
                              <Text
                                className={clsx(
                                  "font-kantunruy-regular text-[13px]",
                                  index % 2 === 0 ? "text-blue" : "text-orange"
                                )}
                              >
                                {item?.englishName}
                              </Text>
                            ) : (
                              <Text
                                className="font-kantunruy-regular text-[12px]"
                                style={{
                                  color:
                                    index % 2 === 0
                                      ? COLORS.BLUE_DARK
                                      : COLORS.ORANGE_DARK,
                                }}
                              >
                                {item?.lastName + " " + item?.firstName}
                              </Text>
                            )}
                          </View>
                          {item?.status === "pending" ? (
                            <View className=" bg-[#f7e13b] rounded-lg px-2 self-center">
                              {/* bg-[#fef08ad8]  text-[#eab308] */}
                              <Text className="text-[#FFFFFF] font-bayon text-[10px] tracking-wider">
                                {item?.status}
                              </Text>
                            </View>
                          ) : item?.status === "approved" ? (
                            <View className=" bg-[#30c03e] rounded-lg px-2 self-center">
                              {/*bg-[#4df85e48] text-[#3dcf4c]  */}
                              <Text className="text-[#FFFFFF] font-bayon text-[10px] tracking-wider">
                                {item?.status}
                              </Text>
                            </View>
                          ) : item?.status === "cancel" ? (
                            <View className="rounded-lg px-2 bg-[#f33939] self-center">
                              {/*bg-[#ff65655e] text-[#fa0202] */}
                              <Text className="text-[#FFFFFF] font-bayon text-[10px] tracking-wider">
                                {item?.status}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                        {item?.from === item?.to ? (
                          <Text
                            className={clsx(
                              "text-xs font-kantunruy-regular pt-1",
                              index % 2 === 0 ? "text-blue" : "text-orange"
                            )}
                          >
                            {getLanguage() === "en"
                              ? moment(item?.from)
                                  .locale("en", localization)
                                  .format("DD MMM, YYYY")
                              : moment(item?.from)
                                  .locale("km", localization)
                                  .format("DD MMM YYYY")}
                          </Text>
                        ) : (
                          <Text
                            className={clsx(
                              "text-xs font-kantunruy-regular pt-1",
                              index % 2 === 0 ? "text-blue" : "text-orange"
                            )}
                          >
                            {getLanguage() === "en"
                              ? moment(item?.from)
                                  .locale("en", localization)
                                  .format("DD MMM, YYYY")
                              : moment(item?.from)
                                  .locale("km", localization)
                                  .format("DD MMM YYYY")}{" "}
                            -{" "}
                            {getLanguage() === "en"
                              ? moment(item?.to)
                                  .locale("en", localization)
                                  .format("DD MMM, YYYY")
                              : moment(item?.to)
                                  .locale("km", localization)
                                  .format("DD MMM YYYY")}
                          </Text>
                        )}
                        <Text
                          className={clsx(
                            "text-xs font-kantunruy-regular items-center pt-1",
                            index % 2 === 0 ? "text-blue" : "text-orange"
                          )}
                          numberOfLines={1}
                        >
                          {item?.reason}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {leaveLimit === leaveData?.length ? (
                <TouchableOpacity
                  className="items-center pb-5 justify-center"
                  onPress={() => setLeaveLimit(leaveLimit + 10)}
                >
                  <Text className="text-sm font-bayon text-main leading-7">
                    {t("មើលបន្ថែម")}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </>
          )}
        </ScrollView>
        {/* <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={({ distanceFromEnd }) =>
            distanceFromEnd > 0 && fetchData()
          }
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading && (
              <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
            )
          }
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  scrollView: {
    justifyContent: "center",
  },
});

export default ViewAllLeaveScreen;
