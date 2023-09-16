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
        borderRadius: 8,
        margin: 5,
        ...props.style,
      }}
      onPress={props?.onPress}
    >
      <View
        style={{
          width: 35,
          height: 35,
          backgroundColor: "white",
          alignSelf: "center",
          borderRadius: 80,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 11,
            fontFamily: "Kantumruy-Regular",
          }}
        >
          {props?.dayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
