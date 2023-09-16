import React, { useContext } from "react";
import { Text, View } from "react-native";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { Image, ActivityIndicator } from "react-native";
import { useTranslation } from "react-multi-lang";

const PickingUpCard = () => {
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
              alignItems: "center",
              width: 50,
              height: 50,
              backgroundColor: COLORS.WHITE,
              borderRadius: 50,
            }}
          >
            <ActivityIndicator size={30} color="#EFB419" />
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
                color: COLORS.ORANGE_DARK,
              }}
            >
              {t("សូមរង់ចាំ")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickingUpCard;
