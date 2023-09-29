import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleController } from "./styleProvider";

export const BtnDay = (props) => {
  const { styleState, height, width } = useContext(StyleController);
  return (
    <TouchableOpacity
      style={{
        width: width * 0.115,
        height: height * 0.055,
        justifyContent: "center",
        borderRadius: 4,
        margin: 3,
        ...props.style,
      }}
      onPress={props?.onPress}
    >
      <View
        style={{
          width: 31,
          height: 31,
          backgroundColor: "white",
          alignSelf: "center",
          borderRadius: 80,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 9,
            fontFamily: "Kantumruy-Regular",
          }}
        >
          {props?.dayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
