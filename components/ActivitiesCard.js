import React, { useContext } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";

export default function ActivitiesCard(props) {
  const { styleState, height, width } = useContext(StyleController);

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
              width: 50,
              height: 50,
              backgroundColor: COLORS.WHITE,
              borderRadius: 50,

              alignSelf: "center",
            }}
          >
            <Image
              source={{ uri: props?.iconsrc }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              left: 10,
              justifyContent: "space-evenly",
              width: width * 0.75
            }}
          >
            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 13,
                color: props?.color,
              }}
            >
              {props?.title}
            </Text>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 13,
                color: props?.color,
              }}
            >
              ចំនួនដង/Times: {props?.qty}
            </Text>
            {props?.description !== "" ? (
              <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 13,
                color: props?.color,
              }}
            >
             {props?.description}
            </Text>
            ):(
            null
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

