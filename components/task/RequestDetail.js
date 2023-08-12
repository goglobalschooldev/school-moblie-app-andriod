import { View, Text, StyleSheet, BackHandler } from "react-native";
import React, { useContext, useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import tailwind from "twrnc";
import moment from "moment";
import Root from "../../root";
import localization from "moment/locale/km";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";
import Header5 from "../../routes/header/Header5";
import { useTranslation } from "react-multi-lang";
import { useFocusEffect } from "@react-navigation/native";

const RequestDetail = ({ navigation, route }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { dataDetail } = route?.params || {};
  //console.log(dataDetail,"dataDetail")
  const t = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("LeaveScreen");
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <Root
      Header={<Header5 title={t("ព័ត៌មានលំអិត")} navigation={navigation} />}
    >
      <View
        style={{
          flex: 1,
          width: width,
          height: height,
          backgroundColor: COLORS.WHITE,
        }}
      >
        <View className="flex h-screen w-[95%] bg-white self-center relative mt-2">
          <View className="flex flex-row justify-between h-9 border-b border-[#c7c7c72a] items-center">
            <Text className="text-xs font-kantunruy-regular text-gray p-2 items-center justify-center">
              {t("ថ្ងៃស្នើសុំសម្រាក")}
            </Text>
            <Text className="text-xs font-kantunruy-regular text-gray p-2 items-center justify-center">
              {moment(dataDetail?.requestDate)
                .locale("en", localization)
                .format("LLL")}
            </Text>
          </View>

          <View className="h-20 border-b border-[#c7c7c72a] items-center justify-center">
            <View className="w-[96%] h-16 bg-blue-thin self-center flex-row rounded-tl-sm rounded-bl-sm">
              <View className="w-[2%] bg-blue rounded-tl-sm rounded-bl-sm" />
              <View className=" flex-col p-2 justify-around">
                {dataDetail?.startDate === dataDetail?.endDate ? (
                  <Text className="text-sm font-kantunruy-regular my-1 p-1">
                    {moment(dataDetail?.startDate)
                      .locale("en", localization)
                      .format("DD MMM, YYYY")}
                  </Text>
                ) : (
                  <Text className="text-sm font-kantunruy-regular my-1 p-1">
                    {moment(dataDetail?.startDate)
                      .locale("en", localization)
                      .format("DD MMM, YYYY")}{" "}
                    -{" "}
                    {moment(dataDetail?.endDate)
                      .locale("en", localization)
                      .format("DD MMM, YYYY")}
                  </Text>
                )}

                <Text className="text-xs font-kantunruy-regular my-1 p-1 self-center">
                  {t("ថ្ងៃសម្រាក")}:{" "}
                  {dataDetail?.shiftId?.shiftName || dataDetail?.shiftName}
                </Text>
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
                {dataDetail?.reason}
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
                <View className="flex-row w-[100%] items-center self-center">
                  <Feather
                    name="check-circle"
                    size={18}
                    color="#3ab731"
                    className="items-center"
                  />
                  <Text className="mx-2 text-sm self-center text-[#3ab731] items-center font-kantunruy-regular p-1 top-0.5">
                    {t("ស្នើសុំសម្រាកជោគជ័យ!")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* </View> */}
    </Root>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    shadowColor: COLORS.SUB,
    shadowOpacity: 0.2,
    alignSelf: "center",
  },
  insideBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  textBar: {
    fontSize: 16,
    color: COLORS.MAIN,
    padding: 8,
    fontFamily: "Bayon-Regular",
  },
});

export default RequestDetail;
