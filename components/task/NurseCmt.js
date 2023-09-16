import React, { useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../../static/styleProvider";
import { COLORS } from "../../color";

export default function NurseCmt({ eysReport }) {
  const { styleState, height, width } = useContext(StyleController);
  // console.log(eysReport[0]?.nurseComment, "props");
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 10,
        // paddingBottom: 5,
      }}
    >
      <View
        style={{
          width: width * 0.95,
          //   height: height * 0.09,
          alignSelf: "center",
          borderRadius: 15,
          backgroundColor: COLORS.BLUE_LIGHT,
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
              source={require("../../assets/Images/nurse.png")}
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
                color: COLORS.BLUE_DARK,
              }}
            >
              មតិពេទ្យ/Nurse's Comment: {eysReport?.nurseComment}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
