import React, { useContext, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";

export default function HealthCard({ eysReport }) {
  const { styleState, height, width } = useContext(StyleController);

  const Checked = () => {
    let checkBox = eysReport?.parentsCheck?.title;
    if (checkBox === true) {
      return (
        <View>
          <MaterialIcons
            name="check-box"
            size={22}
            style={{ color: COLORS.ORANGE_DARK }}
          />
        </View>
      );
    } else if (checkBox === false) {
      return (
        <View>
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            style={{ color: COLORS.ORANGE_DARK }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            style={{ color: COLORS.ORANGE_DARK }}
          />
        </View>
      );
    }
  };

  const checkSchool = () => {
    let check = eysReport?.atSchool?.title;
    if (check === true) {
      return (
        <View>
          <MaterialIcons
            name="check-box"
            size={22}
            style={{ color: COLORS.BLUE_DARK }}
          />
        </View>
      );
    } else if (check === false) {
      return (
        <View>
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            style={{ color: COLORS.BLUE_DARK }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            style={{ color: COLORS.BLUE_DARK }}
          />
        </View>
      );
    }
  };

  return (
    <View style={{ flexDirection: "column" }}>
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
            backgroundColor: COLORS.BLUE_LIGHT,
            justifyContent: "center",
            flexDirection: "column",
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
                source={require("../assets/Images/school.png")}
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
              }}
            >
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 13,
                  color: COLORS.BLUE_DARK,
                }}
              >
                នៅសាលា​/At school
              </Text>
              <View style={styles.section}>
                <Text
                  style={{
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 13,
                    color: COLORS.BLUE_DARK,
                  }}
                >
                  ធម្មតា/Normal
                </Text>
                <View>{checkSchool()}</View>
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 13,
                color: COLORS.BLUE_DARK,
              }}
            >
              ផ្សេងៗ/Other: {eysReport?.atSchool?.description}
            </Text>
          </View>
        </View>
      </View>
      {/* at home */}
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
            flexDirection: "column",
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
                source={require("../assets/Images/Home.jpg")}
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
              }}
            >
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 13,
                  color: COLORS.ORANGE_DARK,
                }}
              >
                នៅផ្ទះ​/At home
              </Text>
              <View style={styles.section}>
                <Text
                  style={{
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 13,
                    color: COLORS.ORANGE_DARK,
                  }}
                >
                  ធម្មតា/Normal
                </Text>
                <View>{Checked()}</View>
              </View>
            </View>
          </View>
          <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 13,
                color: COLORS.ORANGE_DARK,
              }}
            >
              ផ្សេងៗ/Other: {eysReport?.parentsCheck?.description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 19,
    height: 19,
    marginLeft: 8,
    borderColor: COLORS.ORANGE_DARK,
  },
});
