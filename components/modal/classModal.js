import React, { useState, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ClassCard from "../ClassCard";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-multi-lang";

export default function ClassModal({ navigation, data }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectData, setSelectData] = useState({});
  var num = 1;
  const openModalStu = (e, data) => {
    setModalVisible(e);
    setSelectData(data);
  };
  const t = useTranslation();

  // console.log(selectData, "selectData");

  const ChildhoodReport = () => {
    if (selectData?.classGroupCode === "ECE") {
      return (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation?.navigate("ChildReport", {
              invoiceData: selectData,
            });
          }}
        >
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <View style={{ justifyContent: "center" }}>
              <MaterialCommunityIcons
                name="calendar-check-outline"
                size={22}
                color="#3C6EFB"
              />
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 16,
                  color: COLORS.MAIN,
                  left: 12,
                }}
              >
                {t("របាយការណ៍កុមារដ្ឋាន")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.bgModal} />
        </TouchableOpacity>
        <View style={styles.modalView}>
          <View
            style={{
              height: 40,
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
              // backgroundColor:"pink"
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 16,
                  color: COLORS.MAIN,
                }}
              >
                {t("ជ្រើសរើស")}
              </Text>
            </View>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Entypo name="cross" size={28} style={{ color: COLORS.SUB }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "90%",
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation?.navigate("Schedule", { schedule: selectData });
              }}
            >
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../assets/Images/calendar-clock.png")}
                    style={{ width: 18, height: 18 }}
                  />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Bayon-Regular",
                      fontSize: 16,
                      color: COLORS.MAIN,
                      left: 12,
                    }}
                  >
                    {t("កាលវិភាគសិក្សា")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation?.navigate("Attendance", {
                  enrollmentData: selectData,
                });
              }}
            >
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../assets/Images/list-check.png")}
                    style={{ width: 18, height: 18 }}
                  />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Bayon-Regular",
                      fontSize: 16,
                      color: COLORS.MAIN,
                      left: 12,
                    }}
                  >
                    {t("វត្តមានសិស្ស")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation?.navigate("AcedemicFees", {
                  invoiceData: selectData,
                });
              }}
            >
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../assets/Images/calendar_dollar.png")}
                    style={{ width: 18, height: 18 }}
                  />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Bayon-Regular",
                      fontSize: 16,
                      color: COLORS.MAIN,
                      left: 12,
                    }}
                  >
                    {t("ប្រវត្តិបង់ថ្លៃសិក្សា")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {ChildhoodReport()}
          </View>
        </View>
      </Modal>
      {data?.map((load, index) => {
        // console.log(load, "load");
        num++;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => openModalStu(true, load)}
          >
            <ClassCard
              {...load}
              bgColor={num % 2 == 0 ? COLORS.BLUE_LIGHT : COLORS.ORANGE_LIGHT}
              color={num % 2 == 0 ? COLORS.BLUE_DARK : COLORS.ORANGE_DARK}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  modalView: {
    width: "100%",
    height: "45%",
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
  },
});
