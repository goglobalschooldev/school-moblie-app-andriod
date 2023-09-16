import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";

const ClassCard = (props) => {
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
          height: height * 0.09,
          alignSelf: "center",
          borderRadius: 15,
          backgroundColor: props?.bgColor,
          justifyContent: "center",
        }}
      >
        <View
          style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
        >
          <View
            style={{
              justifyContent: "center",
              width: 44,
              height: 44,
              backgroundColor: COLORS.WHITE,
              borderRadius: 50,
            }}
          >
            <Entypo
              name="graduation-cap"
              size={30}
              style={{
                alignSelf: "center",
                color: props?.color,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              left: 10,
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 12,
                  color: props?.color,
                }}
              >
                {props?.classesName + "  "}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 12,
                color: props?.color,
              }}
            >
              {props?.programmeName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClassCard;
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
