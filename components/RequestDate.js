import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useContext, useMemo, useState } from "react";
import moment from "moment/moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tailwind from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import localization from "moment/locale/km";
import { useTranslation } from "react-multi-lang";
import { Image } from "react-native";

const RequestDate = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const t = useTranslation();

  // start dateTime
  const ConfirmStartDate = (date) => {
    setStartDate(moment(date).locale("en", localization).format("YYYY-MM-DD"));
    setIsStartDateVisible(!isStartDateVisible);
  };
  const hideStartDate = () => {
    setIsStartDateVisible(!isStartDateVisible);
  };

  // end dateTime
  const ConfirmEndDate = (date) => {
    setEndDate(moment(date).locale("en", localization).format("YYYY-MM-DD"));
    setIsEndDateVisible(!isEndDateVisible);
  };
  const hideEndDate = () => {
    setIsEndDateVisible(!isEndDateVisible);
  };

  return (
    <View className="flex-col">
      {/* StartDate */}
      <View className="flex h-14 w-full flex-row items-center justify-between bg-white p-2 rounded-md shadow-sm shadow-[#747373]">
        <View className="flex w-[50%] flex-row items-center h-16 self-center">
          <View className="p-2 bg-main rounded-md">
            <Image
              source={require("../assets/Images/calendar-check-white.png")}
              className="h-5 w-5"
            />
          </View>
          <View className="h-14 items-center justify-center self-center">
            <Text className="text-sm font-kantunruy-regular text-black mx-2 pt-1">
              {t("ថ្ងៃចាប់ផ្ដើម")}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex w-[50%] flex-row items-center justify-end"
          onPress={() => setIsStartDateVisible(!isStartDateVisible)}
        >
          <DateTimePickerModal
            isVisible={isStartDateVisible}
            mode="date"
            onConfirm={ConfirmStartDate}
            onCancel={hideStartDate}
          />
          <TextInput
            className="text-black text-sm font-kantunruy-regular p-1 pt-2 bg-[#adacac2d] text-center rounded-md mr-2"
            placeholder="YYYY-MM-DD"
            editable={false}
            value={startDate}
            // onChangeText={handleChange("from")}
          />
        </TouchableOpacity>
      </View>
      {/* EndDate */}
      <View className="flex h-14 w-full flex-row items-center justify-between bg-white p-2 my-4 rounded-md shadow-sm shadow-[#747373]">
        <View className="w-[50%] flex-row items-center">
          <View className="p-2 bg-main rounded-md">
            <Image
              source={require("../assets/Images/calendar-check-white.png")}
              className="h-5 w-5"
            />
          </View>
          <View className="h-14 items-center justify-center self-center">
            <Text className="text-sm font-kantunruy-regular text-black mx-2 pt-1">
              {t("ថ្ងៃបញ្ចប់")}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex w-[50%] flex-row items-center justify-end"
          onPress={() => setIsEndDateVisible(!isEndDateVisible)}
        >
          <DateTimePickerModal
            isVisible={isEndDateVisible}
            mode="date"
            onConfirm={ConfirmEndDate}
            onCancel={hideEndDate}
          />
          <TextInput
            className="text-black text-sm font-kantunruy-regular p-1 pt-2 bg-[#adacac2d] text-center rounded-md mr-2"
            placeholder="YYYY-MM-DD"
            editable={false}
            value={endDate}
            // onChangeText={handleChange("to")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestDate;
