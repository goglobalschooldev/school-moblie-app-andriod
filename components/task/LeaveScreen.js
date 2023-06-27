import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Animated,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useMemo, useContext } from "react";
import { PlusIcon } from "react-native-heroicons/outline";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation, getLanguage } from "react-multi-lang";
import RequestCard from "../RequestCard";
import Header4 from "../../routes/header/Header4";
import { useQuery } from "@apollo/client";
import { STUDENT_ATT_PERMISSION } from "../../graphql/gql_GetStudentAttPermission";
import { StyleController } from "../../static/styleProvider";
import { DataController } from "../../context/Provider";
import moment from "moment";
import localization from "moment/locale/km";

const LeaveScreen = ({ navigation, route }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { enrollmentDBCtx } = useContext(DataController);
  const [shiftPagination, setShiftPagination] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [stuID, setStuID] = useState();
  const [attLimit, setAttLimit] = useState(10);
  const [viewAtt, setViewAtt] = useState([]);
  const { data } = route?.params || {};
  const t = useTranslation();

  useEffect(() => {
    enrollmentDBCtx?.forEach((element) => {
      setStuID(element?.studentId);
    });
  }, [enrollmentDBCtx]);

  const {
    data: PermissionData,
    loading,
    refetch,
  } = useQuery(STUDENT_ATT_PERMISSION, {
    variables: {
      stuId: stuID,
      limit: attLimit,
    },
    pollInterval: 2000,
    onCompleted: ({ getStudenAttendancePermissionById }) => {
      // console.log(getStudenAttendancePermissionById,"getStudenAttendancePermissionById")
      setShiftPagination(getStudenAttendancePermissionById);
      setViewAtt(getStudenAttendancePermissionById);
    },
    onError: (e) => {
      console.log(e.message, "PermissionError");
    },
  });

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

  if (loading) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header4 navigation={navigation} title={t("ស្នើសុំច្បាប់")} />
      <View className="flex w-full bg-background items-center mb-12">
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
          {PermissionData?.getStudenAttendancePermissionById?.length === 0 ? (
            <View className="flex h-fit bg-background flex-col items-center pt-[120%]">
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
            <View className="pt-1 pb-2 items-center">
              {PermissionData?.getStudenAttendancePermissionById?.map(
                (item, index) => (
                  <RequestCard
                    navigation={navigation}
                    item={item}
                    key={index}
                  />
                )
              )}
            </View>
          )}
          {attLimit === viewAtt?.length ? (
            <View className="items-center justify-start h-16">
              <TouchableOpacity onPress={() => setAttLimit(attLimit + 5)}>
                <Text className="text-base font-bayon text-main p-1">
                  {t("មើលបន្ថែម")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="items-center justify-start h-16" />
          )}
        </ScrollView>
        <TouchableOpacity
          className="bottom-8 absolute right-5"
          onPress={() =>
            navigation.navigate("LeaveRequest", { enrollment: data })
          }
        >
          <View
            className="h-14 w-14 bg-main rounded-full justify-center items-center"
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
          >
            <PlusIcon size={35} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // justifyContent: "center",
    // width: "100%",
    // height: "100%",
  },
});

export default LeaveScreen;
