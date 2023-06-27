import React,{ useContext } from "react";
import { Text, TouchableOpacity,View } from "react-native";
import { COLORS } from "../color";
import { StyleController } from "./styleProvider";

export const PartComponent = (props) => {
    const { styleState, height, width } = useContext(StyleController);
  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        alignSelf: "center",
        top: 8,
      }}
    >
      <View style={{ height: 25, justifyContent: "center" }}>
        <View
          style={{
            height: 1,
            width: width * 0.95,
            backgroundColor: COLORS.MAIN,
          }}
        />
      </View>
      <View style={{ alignItems: "baseline", position: "absolute" }}>
        <View style={{ backgroundColor: "white", paddingRight: 8 }}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.MAIN,
              fontFamily: "Bayon-Regular",
            }}
          >
            {props?.title}
          </Text>
        </View>
      </View>
    </View>
  );
};
