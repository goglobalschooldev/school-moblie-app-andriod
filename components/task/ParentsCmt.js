import React, { useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../../static/styleProvider";
import { COLORS } from "../../color";

export default function ParentsCmt({ eysReport }) {
  const { styleState, height, width } = useContext(StyleController);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 10,
      }}
    >
      <View
        style={{
          width: width * 0.95,
          alignSelf: "center",
          borderRadius: 15,
          backgroundColor: COLORS.ORANGE_LIGHT,
          justifyContent: "center",
        }}
      >
        <View
          style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
        >
          <View
            style={{
              justifyContent: "center",
              width: 50,
              height: 50,
              backgroundColor: COLORS.WHITE,
              borderRadius: 50,
            }}
          >
            <Image
              source={require("../../assets/Images/parents.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
              }}
            />
          </View>
          <View
            style={{
              width: width * 0.75,
              flexDirection: "column",
              left: 10,
              justifyContent: "space-evenly",
            }}
          >
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 13,
                color: COLORS.ORANGE_DARK,
              }}
            >
              មតិមាតាបិតា/Parent's Comment: {eysReport?.parentsComment}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
