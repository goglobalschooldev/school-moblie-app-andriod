import React, { useContext } from "react";
import { Text, View } from "react-native";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { Image } from "react-native";
import { useTranslation } from "react-multi-lang";

const PickupCard = () => {
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
              width: 44,
              height: 44,
              backgroundColor: COLORS.WHITE,
              borderRadius: 50,
            }}
          >
            <Image
              source={require("../assets/Images/father-daughter-and-mother.png")}
              style={{ alignSelf: "center", width: 25, height: 25 }}
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
                fontSize: 12,
                color: COLORS.ORANGE_DARK,
              }}
            >
              {t("សូមចុចទីនេះដើម្បីទទួលកូនរបស់លោកអ្នក")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickupCard;
