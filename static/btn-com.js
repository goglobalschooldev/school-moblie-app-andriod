import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const GoButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        ...props.style,
      }}
      onPress={props?.onPress}
      disabled={props?.disabled}
    >
      <Text
        style={{
          fontFamily: props?.font,
          textAlign: props?.align,
          color: props?.color,
          fontSize: props?.size,
          fontWeight: props?.fontWeight,
          padding: props?.padding,
          top: props?.top,
          bottom: props?.bottom,
          left: props?.left,
          right: props?.right,
        }}
      >
        {props?.title}
      </Text>
    </TouchableOpacity>
  );
};
