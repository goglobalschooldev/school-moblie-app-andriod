import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { Image } from "react-native";
import { useTranslation } from "react-multi-lang";

const AttCard = () => {
  const { styleState, height, width } = useContext(StyleController);
  const t = useTranslation();
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
              source={require("../assets/Images/clock-three.png")}
              style={{ alignSelf: "center", width: 30, height: 30 }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              left: 10,
              justifyContent: "space-evenly",
            }}
          >
            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 14,
                color: COLORS.BLUE_DARK,
              }}
            >
              {t("សូមចុចទីនេះដើម្បីមើលវត្តមាន")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttCard;
