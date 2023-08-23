import clsx from "clsx";
import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import localization from "moment/locale/km";
import { useTranslation } from "react-multi-lang";

export default function AttendanceList(props) {
  const t = useTranslation();
  return (
    <View
      style={{
        flexDirection: "column",
      }}
    >
      <View className="flex flex-row h-fit w-[97%] bg-white items-center border-b border-background self-center">
        <View className="py-3 justify-center w-[21%] items-center">
          <Text className="text-black font-kantunruy-regular text-xs leading-6">
            {moment(props?.data)
              .locale("en", localization)
              .format("DD MMM YYYY")}
          </Text>
        </View>
        <View className=" justify-center self-center w-[30%] items-center px-1">
          <Text
            className="text-black font-kantunruy-regular text-xs leading-6"
            // numberOfLines={1}
          >
            {props?.classroom}
          </Text>
        </View>
        <View className="py-3 justify-center w-[16%] items-center">
          {props?.check_in === null ||
          props?.check_in === "" ||
          props?.check_in === undefined ? (
            <Text className="text-black font-kantunruy-regular text-xs leading-6">
              --:--
            </Text>
          ) : (
            <Text className="text-black font-kantunruy-regular text-xs leading-6">
              {props?.check_in}
            </Text>
          )}
        </View>
        <View className="py-3 justify-center w-[16%] items-center">
          {props?.check_out === null ||
          props?.check_out === "" ||
          props?.check_out === undefined ? (
            <Text className="text-black font-kantunruy-regular text-xs leading-6">
              --:--
            </Text>
          ) : (
            <Text className="text-black font-kantunruy-regular text-xs leading-6">
              {props?.check_out}
            </Text>
          )}
        </View>
        <View className="py-3 justify-center w-[17%] items-center">
          <Text
            className={clsx(
              "font-kantunruy-regular text-xs leading-6",
              props?.status === "LATE"
                ? "text-[#00AE50]"
                : props?.status === "PRESENT"
                ? "text-[#0000FD]"
                : props?.status === "ABSENT"
                ? "text-[#FD0002]"
                : props?.status === "PERMISSION"
                ? "text-[#FEBE00]"
                : "text-black"
            )}
          >
            {props?.status === "LATE"
              ? t("យឺត")
              : props?.status === "PRESENT"
              ? t("វត្តមាន")
              : props?.status === "ABSENT"
              ? t("អវត្តមាន")
              : props?.status === "PERMISSION"
              ? t("សុំច្បាប់")
              : null}
          </Text>
        </View>
      </View>
    </View>
  );
}
