import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { COLORS } from "../../color";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleController } from "../../static/styleProvider";

export default function Header3({ navigation, title }) {
  const { styleState, height, width } = useContext(StyleController);

  return (
    <View style={styles.header}>
      <View style={styles.insideBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            style={{ color: COLORS.MAIN, left: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.SUB,
    shadowOpacity: 0.2,
    alignSelf: "center",
  },
  insideBar: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
  },
  textBar: {
    fontSize: 16,
    letterSpacing: 1,
    color: COLORS.MAIN,
    padding: 8,
    fontFamily: "Bayon-Regular",
  },
});
