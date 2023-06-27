import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import tailwind from "twrnc";
import localization from "moment/locale/km";

const RequestCard = ({ navigation, item }) => {
  // console.log(item,"item")
  return (
    <TouchableOpacity
      className="h-fit w-[97%] bg-white rounded-lg flex-row justify-between p-2 items-center my-1"
      onPress={() => navigation.navigate("RequestDetail", { dataDetail: item })}
    >
      <View className="flex w-[75%]">
        <View className="flex flex-col justify-around">
          <Text className="text-xs font-kantunruy-regular text-gray">
            {item?.shiftId?.shiftName}
          </Text>
          {item?.startDate === item?.endDate ? (
            <Text className="text-sm font-kantunruy-regular text-black pt-1">
              {moment(item?.startDate)
                .locale("en", localization)
                .format("DD MMM, YYYY")}
            </Text>
          ) : (
            <Text className="text-sm font-kantunruy-regular text-black pt-1">
              {moment(item?.startDate)
                .locale("en", localization)
                .format("DD MMM, YYYY")}{" "}
              -{" "}
              {moment(item?.endDate)
                .locale("en", localization)
                .format("DD MMM, YYYY")}
            </Text>
          )}

          <Text
            className="text-xs font-kantunruy-regular text-gray items-center pt-1"
            numberOfLines={1}
          >
            {item?.reason}
          </Text>
        </View>
      </View>
      <View className="w-[25%]">
        <View className="justify-center items-center h-7 bg-blue-thin rounded-md">
          <Text className="text-blue text-xs items-center">
            {moment(item?.requestDate)
              .locale("en", localization)
              .format("DD MMM, YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
