import { View, Text } from "react-native";
import React from "react";
import localization from "moment/locale/km";
import { useTranslation } from "react-multi-lang";
import moment from "moment";

const TransportationItem = (props) => {
  const t = useTranslation();
  return (
    <View className="flex flex-col">
      <View className="flex flex-row h-12 w-[97%] bg-white  items-center border-b border-background self-center">
        <View className="h-full justify-center w-[34%] items-center">
          <Text className="text-black font-kantunruy-regular text-xs">
            {moment(props?.date)
              ?.locale("en", localization)
              ?.format("DD MMM YYYY")}
          </Text>
        </View>

        <View className="flex flex-row h-full w-[100%] bg-white  items-center self-center">
          <View className="h-12 justify-around w-[33%] items-center flex-col">
            <Text className="text-black font-kantunruy-regular text-xs">
              {props?.checkIn !== "" && props?.checkIn !== null
                ? props?.checkIn
                : "---:---"}
            </Text>
          </View>
          <View className="h-12 justify-around w-[33%] items-center flex-col">
            <Text className="text-black font-kantunruy-regular text-xs">
              {props?.checkOut !== "" && props?.checkOut !== null
                ? props?.checkOut
                : "---:---"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransportationItem;
