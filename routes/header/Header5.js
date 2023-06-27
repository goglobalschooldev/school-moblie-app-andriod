import React, { useContext, useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar } from "react-native-elements";
import { COLORS } from "../../color";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleController } from "../../static/styleProvider";
import { DataController } from "../../context/Provider";

export default function Header5({ navigation, title}) {
  const { styleState, height, width } = useContext(StyleController);
  const { studentDBCtx } = useContext(DataController);
  //
  let ProfileImage = studentDBCtx?.profileImg;

  const StudentImage = useMemo(() => {
    const studentImage =
      "https://storage.go-globalschool.com/api" + ProfileImage;
    if (
        studentImage === "https://storage.go-globalschool.com/api" ||
      null ||
      ProfileImage === null
    ) {
      return (
        <Image
          resizeMode="cover"
          style={{
            height: 28,
            width: 28,
            borderRadius: 50,
            position: "absolute",
          }}
          source={require("../../assets/Images/student.png")}
        />
      );
    } else {
      return (
        <Image
          resizeMode="cover"
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            position: "absolute",
          }}
          source={{ uri: studentImage + "?time=" + new Date() }}
        />
      );
    }
  }, [ProfileImage]);

  return (
    <View style={{ width: width, backgroundColor: COLORS.WHITE }}>
      <View style={styles.header}>
        <View style={styles.insideBar}>
          <View
            style={{
              width: width * 0.7,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => navigation.navigate("LeaveScreen")}
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                style={{ color: COLORS.MAIN }}
              />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("LeaveScreen")}>
              <Text style={styles.textBar}>{title}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width * 0.25,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
              <Avatar
                size={30}
                rounded
                ImageComponent={() => StudentImage}
                overlayContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
           
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    shadowColor: COLORS.SUB,
    shadowOpacity: 0.2,
    alignSelf: "center",
  },
  insideBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  textBar: {
    fontSize: 16,
    color: COLORS.MAIN,
    padding: 8,
    fontFamily: "Bayon-Regular",
  },
});
