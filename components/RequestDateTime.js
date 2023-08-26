import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment/moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tailwind from "twrnc";
import { Feather } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import localization from "moment/locale/km";

const RequestDateTime = ({
  startDate,
  setStartDate,
  setEndDate,
  requestTime,
  setRequestTime,
}) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);

  // start dateTime
  const ConfirmStartDate = (date) => {
    setStartDate(moment(date).locale("en", localization).format("MM/DD/YYYY"));
    setEndDate(moment(date).locale("en", localization).format("MM/DD/YYYY"));
    // setFieldValue("from" , date)
    setIsStartDateVisible(!isStartDateVisible);
  };

  const hideStartDate = () => {
    setIsStartDateVisible(!isStartDateVisible);
  };

  return (
    <View className="flex-col">
      {/* StartDate */}
      <View className="w-full flex-row justify-between">
        <View className="w-[50%] justify-center ">
          <Text className="text-sm font-gothic text-black mx-9">Date</Text>
        </View>
        <TouchableOpacity
          className="flex w-[50%] flex-row items-center justify-end"
          style={tailwind`p-2 android:p-0`}
          onPress={() => setIsStartDateVisible(!isStartDateVisible)}
        >
          <DateTimePickerModal
            isVisible={isStartDateVisible}
            mode="date"
            onConfirm={ConfirmStartDate}
            onCancel={hideStartDate}
          />

          <TextInput
            className="text-black text-xs font-gothic text-right bg-white p-2"
            placeholder="MM/DD/YYYY"
            editable={false}
            value={startDate}
          />
          <MaterialIcons name="date-range" size={22} color="#A9A9A9" />
        </TouchableOpacity>
      </View>
      <View className="w-full flex-row justify-between">
        {/* <View className="flex h-14 w-full flex-row border-b border-[#c7c7c757] items-center justify-between"> */}
        <View className="w-[50%] justify-center ">
          <Text className="text-sm font-gothic text-black mx-9">Shift</Text>
        </View>

        <View className="flex w-[50%] flex-row items-center justify-end">
          <SelectDropdown
            data={["Morning", "Afternoon"]}
            defaultValue={requestTime}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setRequestTime(selectedItem);
            }}
            buttonStyle={styles.dropdown3BtnStyle}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropdown3BtnChildStyle}>
                  <Text style={styles.dropdown3BtnTxt}>
                    {selectedItem ? (
                      <Text className="text-sm font-gothic text-gray">
                        {selectedItem}
                      </Text>
                    ) : (
                      <Text className="text-sm font-gothic text-[#A9A9A9]">
                        Select shift
                      </Text>
                    )}
                  </Text>
                  <Image
                    source={require("../assets/Images/angle-down.png")}
                    className="h-4 w-4"
                  />
                </View>
              );
            }}
            dropdownStyle={styles.dropdown3DropdownStyle}
            rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View style={styles.dropdown3RowChildStyle}>
                  <Text style={styles.dropdown3RowTxt}>{item}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown3BtnStyle: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    paddingHorizontal: 0,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdown3BtnImage: { width: 18, height: 18 },
  dropdown3BtnTxt: {
    color: "#444",
    textAlign: "center",
    fontSize: 14,
    marginHorizontal: 10,
  },
  dropdown3DropdownStyle: { backgroundColor: "white" },
  dropdown3RowStyle: {
    backgroundColor: "white",
    borderBottomColor: "#c7c7c757",
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdownRowImage: { width: 18, height: 18 },
  dropdown3RowTxt: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
    marginHorizontal: 12,
  },
  switchText: {
    paddingTop: Platform.OS === "ios" ? 0 : 12,
  },
});

export default RequestDateTime;
