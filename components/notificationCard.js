import React, { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { Image } from "react-native";
import { ENROLLMENT_STUDENTS } from "../graphql/gql_enrollmentByStudents";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import moment from "moment";
import localization from "moment/locale/km";
import { getLanguage } from "react-multi-lang";

export default function NotificationCard(props) {
  const { styleState, height, width } = useContext(StyleController);
  // console.log(props, "props");
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View
        className={`h-fit w-[95%] justify-center self-center my-1 rounded-lg
        ${props?.view === true ? "bg-[#dceeff36]" : "bg-[#DCEEFF]"}`}
      >
        <View className="w-[95%] flex-row self-center py-2">
          <View className="w-[20%]">
            <Image
              source={{
                uri:
                  "https://storage.go-globalschool.com/api" +
                  props?.notifBy?.image,
              }}
              className="h-14 w-14 rounded-full"
              style={{ borderColor: COLORS.BLUE_DARK, borderWidth: 0.5 }}
            />
          </View>
          <View className="flex flex-col w-[80%] justify-around">
            <View className="flex flex-row">
              <Text
                className="font-kantunruy-regular text-sm leading-6 pr-1"
                style={{ color: COLORS.BLUE_DARK }}
              >
                {props?.notifBy?.name}
              </Text>
              <View
                className={clsx(
                  "rounded-2xl px-2 items-center self-center",
                  props?.action === "approveLeave" ||
                    props?.action === "canceledLeave"
                    ? "bg-[#3c6ffb]"
                    : props?.action === "checkIn" ||
                      props?.action === "checkOut"
                    ? "text-[#00AE50]"
                    : "text-[#ff4747]"
                )}
              >
                <Text className="font-bayon text-[10px] text-white tracking-wide">
                  {props?.action === "approveLeave" ||
                  props?.action === "canceledLeave"
                    ? "Leave"
                    : props?.action === "checkIn" ||
                      props?.action === "checkOut"
                    ? "Attendance"
                    : "Announce"}
                </Text>
              </View>
            </View>
            <View className="flex-row w-full">
              <Text className="text-[#6795C0] text-[13px] font-kantunruy-regular leading-5">
                {props?.description}
              </Text>
            </View>
            {getLanguage() === "en" ? (
              <Text className="text-[11px] text-[#6795C0] font-kantunruy-regular leading-4">
                {moment
                  .utc(new Date(props?.createdAt))
                  .locale("en", localization)
                  .startOf("seconds")
                  .fromNow()}
              </Text>
            ) : (
              <Text className="text-[10px] text-[#6795C0] font-kantunruy-regular leading-5">
                {moment
                  .utc(new Date(props?.createdAt))
                  .locale("km", localization)
                  .startOf("seconds")
                  .fromNow()}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
