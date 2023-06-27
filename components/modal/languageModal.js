import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { Image } from "react-native";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Platform,
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
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";

setTranslations({ en, kh });
setDefaultLanguage("kh");
setDefaultTranslations({ kh });

export default function LanguageModal() {
  const { styleState, height, width } = useContext(StyleController);
  const [openSelectLng, setOpenSelectLng] = useState(false);
  const { langDBCtxDispatch } = useContext(DataController);
  const [test, setTest] = useState()
  const t = useTranslation();

  const ImageFlag = () => {
    if (getLanguage() === "kh") {
      return(
        <Image
          source={require("../../assets/Images/Cambodia-Flag.png")}
          style={styles.imageStyle}
        />
      )
    }else{
      return(
        <Image
          source={require("../../assets/Images/English-Flag.png")}
          style={styles.imageStyle}
        />
      )
    }
  }
 

  //step1
  const setLocalLang = async (lang) => {
    await AsyncStorage.setItem("@lang", lang);
    // console.log(lang, "lang");
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

  //step2
  const ChangeEng = () => {
    setLanguage("en");
    setLocalLang("en");
    setOpenSelectLng(!openSelectLng);
  };

  const ChangeKh = () => {
    setLanguage("kh");
    setLocalLang("kh");
    setOpenSelectLng(!openSelectLng);
  };

  return (
    <View style={{ width: "100%" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openSelectLng}
        onRequestClose={() => {
          setOpenSelectLng(!openSelectLng);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setOpenSelectLng(!openSelectLng)}
        >
          <View style={styles.bgModal} />
        </TouchableWithoutFeedback>
        <View style={styles.centerModal}>
          <View style={styles.modalBox}>
            <View style={{ padding: 5 }}>
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 14,
                  color: COLORS.MAIN,
                }}
              >
                {t("ជ្រើសរើសភាសា")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                padding: 10,
                // backgroundColor: "pink",
                width: "100%",
              }}
            >
              <TouchableOpacity onPress={() => ChangeKh()}>
                <View style={styles.lngChoice}>
                  <Image
                    source={require("../../assets/Images/Cambodia-Flag.png")}
                    style={styles.imageChoose}
                  />
                  <Text style={styles.titleLng}>ភាសាខ្មែរ</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ChangeEng()}>
                <View style={styles.lngChoice}>
                  <Image
                    source={require("../../assets/Images/English-Flag.png")}
                    style={styles.imageChoose}
                  />
                  <Text style={styles.titleLng}>English</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setOpenSelectLng(!openSelectLng)}>
        {ImageFlag()}
      </TouchableOpacity>
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
    width: 27,
    height: 27,
    alignSelf: "center",
    borderRadius: 50,
    borderColor: COLORS.ORANGE,
    borderWidth: 1,
  },
  imageChoose: {
    width: 38,
    height: 38,
    borderRadius: 70,
    alignSelf: "center",
    borderColor: COLORS.ORANGE,
    borderWidth: 1,
  },
  titleLng: {
    alignSelf: "center",
    left: 10,
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
  },
  lngChoice: {
    flexDirection: "row",
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#E4E4E4",
    padding: 2,
  },
});
