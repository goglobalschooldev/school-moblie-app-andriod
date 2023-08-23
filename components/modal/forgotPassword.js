import React, { useState, useContext, useEffect } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useTranslation } from "react-multi-lang";

export default function ForgotPasswordModal() {
  const { styleState, height, width } = useContext(StyleController);
  const [modalVisible, setModalVisible] = useState(false);
  const t = useTranslation();

  const handleOpenFacebook = () => {
    Linking.openURL("https://www.facebook.com/goglobalschool15/");
  };
  const handleOpenWebsite = () => {
    Linking.openURL("https://www.go-globalschool.com/");
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.bgModal} />
        </TouchableOpacity>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              width: "95%",
              padding: 3,
            }}
          >
            <View style={{ justifyContent: "flex-end", alignSelf: "flex-end" }}>
              <Entypo name="cross" size={28} style={{ color: COLORS.SUB }} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: "95%",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 18,
                color: COLORS.MAIN,
              }}
            >
              {t("សូមទាក់ទងមកយើងខ្ញុំតាមព័ត៌មានខាងក្រោម")}
            </Text>
          </View>
          <View
            style={{
              width: "99%",
              flexDirection: "column",
            }}
          >
            <TouchableOpacity onPress={handleOpenFacebook}>
              <View style={styles.listInfo}>
                <FontAwesome5
                  name="facebook"
                  size={22}
                  style={{ color: COLORS.SUB }}
                />
                <Text
                  style={{ fontSize: 14, justifyContent: "center", left: 8 }}
                >
                  Go Global School
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.listInfo}>
              <Ionicons name="mail" size={22} style={{ color: COLORS.SUB }} />
              <Text
                style={{
                  fontSize: 14,
                  justifyContent: "center",
                  left: 8,
                  color: COLORS.MAIN,
                }}
              >
                info@go-globalschool.com
              </Text>
            </View>
            <View style={styles.listInfo}>
              <FontAwesome
                name="phone"
                size={22}
                style={{ color: COLORS.SUB }}
              />
              <Text
                style={{
                  fontSize: 14,
                  justifyContent: "center",
                  left: 8,
                  fontFamily: "Kantumruy-Regular",
                }}
              >
                063 5066 999/ 017 604 426/ 017 511 168/{"\n"}
                010 537 695
              </Text>
            </View>
            <TouchableOpacity onPress={handleOpenWebsite}>
              <View style={styles.listInfo}>
                <Ionicons
                  name="globe-outline"
                  size={22}
                  style={{ color: COLORS.SUB }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    justifyContent: "center",
                    left: 8,
                    color: COLORS.MAIN,
                  }}
                >
                  https://www.go-globalschool.com
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.listInfo}>
              <Entypo name="location" size={22} style={{ color: COLORS.SUB }} />
              <Text
                style={{
                  fontSize: 14,
                  justifyContent: "center",
                  left: 8,
                  fontFamily: "Kantumruy-Regular",
                }}
              >
                {t("ភូមិថ្មី សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប ខេត្តសៀមរាប")}
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.forgetPass}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text
            style={{
              fontFamily: "Bayon-Regular",
              color: COLORS.MAIN,
              fontSize: 14,
            }}
          >
            {t("ភ្លេចពាក្យសម្ងាត់?")}
          </Text>
        </TouchableOpacity>
      </View>
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
    height: "60%",
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
  forgetPass: {
    // paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // backgroundColor: "red"
  },
  listInfo: {
    flexDirection: "row",
    width: "95%",
    padding: 5,
    alignItems: "center",
    marginVertical: 2,
  },
});
