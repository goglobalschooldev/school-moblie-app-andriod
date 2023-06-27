import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleController } from "./styleProvider";

export const BtnDay = (props) => {
  const { styleState, height, width } = useContext(StyleController);
  return (
    <TouchableOpacity
      style={{
        width: width * 0.145,
        height: height * 0.07,
        justifyContent: "center",
        borderRadius: 8,
        margin: 5,
        ...props.style,
      }}
      onPress={props?.onPress}
    >
      <View
        style={{
          width: 45,
          height: 45,
          backgroundColor: "white",
          alignSelf: "center",
          borderRadius: 80,
          justifyContent: "center",

        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 14,
            fontFamily: "Kantumruy-Regular",
          }}
        >
          {props?.dayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
