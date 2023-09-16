import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { Image } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
  getLanguage,
  setLanguage,
  setDefaultTranslations,
} from "react-multi-lang";
import en from "../../translations/en.json";
import kh from "../../translations/kh.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";
import { Popover, Button, Box } from "native-base";

setTranslations({ en, kh });
setDefaultLanguage("kh");
setDefaultTranslations({ kh });

export default function LanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslation();

  const ImageFlag = () => {
    if (getLanguage() === "kh") {
      return (
        <Image
          source={require("../../assets/Images/Cambodia-Flag.png")}
          style={styles.imageStyle}
        />
      );
    } else {
      return (
        <Image
          source={require("../../assets/Images/English-Flag.png")}
          style={styles.imageStyle}
        />
      );
    }
  };

  //step1
  const setLocalLang = async (lang) => {
    await AsyncStorage.setItem("@lang", lang);
    // console.log(lang, "lang");
  };

  //step2
  const ChangeEng = () => {
    setLanguage("en");
    setLocalLang("en");
  };

  const ChangeKh = () => {
    setLanguage("kh");
    setLocalLang("kh");
  };

  //step3
  useEffect(() => {
    async function fetchData() {
      let getLang = await AsyncStorage.getItem("@lang");
      setLanguage(getLang);
      // setTest(getLang);
    }
    fetchData();
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <Popover
        trigger={(triggerProps) => {
          return (
            <TouchableOpacity {...triggerProps} onPress={() => setIsOpen(true)}>
              {ImageFlag()}
            </TouchableOpacity>
          );
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
      >
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.CloseButton onPress={() => setIsOpen(false)} />
          <Popover.Header>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: COLORS.MAIN,
              }}
            >
              {t("ជ្រើសរើសភាសា")}
            </Text>
          </Popover.Header>
          <Popover.Body>
            <View
              style={{
                flexDirection: "column",
                padding: 2,
                // backgroundColor: "pink",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  ChangeKh(), setIsOpen(false);
                }}
              >
                <View style={styles.lngChoice}>
                  <Text style={styles.titleLng}>ភាសាខ្មែរ</Text>
                  <Image
                    source={require("../../assets/Images/Cambodia-Flag.png")}
                    style={styles.imageChoose}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{ width: "100%", height: 1, backgroundColor: "#dcdcdc" }}
              />
              <TouchableOpacity
                onPress={() => {
                  ChangeEng(), setIsOpen(false);
                }}
              >
                <View style={styles.lngChoice}>
                  <Text style={styles.titleLng}>English</Text>
                  <Image
                    source={require("../../assets/Images/English-Flag.png")}
                    style={styles.imageChoose}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Popover.Body>
        </Popover.Content>
      </Popover>
    </View>
  );
}
const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    // height: "23%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    // backgroundColor: "pink",
  },
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  imageStyle: {
    width: 23,
    height: 23,
    alignSelf: "center",
    borderRadius: 50,
    borderColor: COLORS.ORANGE,
    borderWidth: 1,
  },
  imageChoose: {
    width: 25,
    height: 25,
    borderRadius: 70,
    alignSelf: "center",
    borderColor: COLORS.ORANGE,
    borderWidth: 1,
  },
  titleLng: {
    flex: 1,
    alignSelf: "center",
    // left: 10,
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
  },
  lngChoice: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 2,
  },
});
