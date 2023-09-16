import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { Image } from "react-native";
import { useTranslation } from "react-multi-lang";

const ViewLeaveCard = () => {
  const { styleState, height, width } = useContext(StyleController);
  const t = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 10,
        // top: 10
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
          style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
          }}
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
              source={require("../assets/Images/search.png")}
              style={{ alignSelf: "center", width: 22, height: 22 }}
            />
          </View>
          <View
            style={{
              width: " 80%",
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
              {t("សូមចុចទីនេះដើម្បីមើលប្រវត្តិសុំច្បាប់")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewLeaveCard;
