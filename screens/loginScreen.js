import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import { Ionicons } from "@expo/vector-icons";
import { DataController } from "../context/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION } from "../context/Reducer";
import RootLog from "../rootLog";
import Checkbox from "expo-checkbox";
import { useTranslation, getLanguage, setTranslations } from "react-multi-lang";
import LanguageModal from "../components/modal/languageModal";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { ADD_MOBILE_USER_TOKEN } from "../graphql/add_mobileUserToken";
import graphQLClient from "../config/endpoint_2";
import auth from "../Auth/auth";

export default function LoginScreen({ navigation }, props) {
  const { styleState, width, height } = useContext(StyleController);
  const [openEye, setOpenEye] = useState(true);
  const { accountDBCtxDispatch, loginedDispatch, user, accountDBCtx } =
    useContext(DataController);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notiToken, setNotiToken] = useState("");
  const [isChecked, setChecked] = useState(false);
  const t = useTranslation();

  //getItem
  const getLocalStorage = async () => {
    let tokenNoti = await AsyncStorage.getItem("@tokenNoti");
    setNotiToken(tokenNoti, "tokenNoti");
    return tokenNoti;
  };

  useEffect(() => {
    let interV = setInterval(() => {
      getLocalStorage();
    }, 2000);

    return () => {
      clearInterval(interV);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          experienceId: "@goglobal_school/school-mobile",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

  const setLocalStorage = async (value) => {
    await AsyncStorage.setItem("@login", JSON.stringify(value));
  };

  const setLocalDataUser = async ({ email, password, isChecked }) => {
    await AsyncStorage.setItem(
      "@userData",
      JSON.stringify({ email, password, isChecked })
    );
  };

  useEffect(() => {
    async function fetchData() {
      let getData = await AsyncStorage.getItem("@userData");
      let getUser = getData === null ? {} : JSON.parse(getData);
      setEmail(getUser?.email);
      setPassword(getUser?.password);
      setChecked(getUser?.isChecked);
      if (getUser?.isChecked === true) {
        setChecked(getUser?.isChecked);
        setEmail(getUser?.email);
        setPassword(getUser?.password);
        if (
          getUser?.isChecked === true &&
          getUser?.password &&
          getUser?.isChecked
        ) {
          // loginedDispatch({
          //   type: ACTION.LOGIN_USER,
          //   payload: true,
          // });
        }
      }
      // console.log(getData2, "getUser");
    }
    fetchData();
  }, [navigation]);

  const setMobileUserToken = async (userId) => {
    try {
      const addUsertoken = await graphQLClient.request(ADD_MOBILE_USER_TOKEN, {
        user: userId,
        token: notiToken,
        osType: "android",
      });
      // console.log(addUsertoken, "addUsertoken");
    } catch (error) {
      console.log(error.message, "erroraddUsertoken");
    }
  };

  const HandleLogin = async () => {
    if (email === "" && password === "") {
      Alert.alert(
        t("មិនមានទិន្នន័យ"),
        t("សូមបញ្ចូលអ៉ីម៉ែល និងលេខសម្ងាត់របស់អ្នក")
      );
    } else if (email === "") {
      Alert.alert(t("មិនមានទិន្នន័យ"), t("សូមបញ្ចូលអ៉ីម៉ែលរបស់អ្នក"));
    } else if (password === "") {
      Alert.alert(t("មិនមានទិន្នន័យ"), t("សូមបញ្ចូលលេខសម្ងាត់របស់អ្នក"));
    } else {
      await auth.login(email, password).then((result) => {
        if (result?.status) {
          registerForPushNotificationsAsync().then(async (token) => {
            if (token) {
              await AsyncStorage.setItem("@tokenNoti", token);
            }
            setMobileUserToken(result?.uid);
          });

          accountDBCtxDispatch({
            type: ACTION.LOGIN_USER,
            payload: result,
          });
          setLocalStorage(result);
          setLocalDataUser({ email, password, isChecked });
          loginedDispatch({
            type: ACTION.LOGIN_USER,
            payload: true,
          });
        } else {
          Alert.alert(
            t("សូមព្យាយាមម្ដងទៀត"),
            t("គណនីរបស់លោកអ្នកមិនត្រឹមត្រូវទេ")
          );
        }
      });
    }
  };

  return (
    <RootLog>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground
          source={require("../assets/Images/background.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View
            style={{
              height: height,
              width: width,
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 10,
                alignSelf: "flex-end",
                right: 15,
              }}
            >
              <LanguageModal />
            </View>
            <View>
              <View style={{ alignSelf: "center" }}>
                <Image
                  source={require("../assets/Images/Logo.png")}
                  style={{ width: 120, height: 120 }}
                />
              </View>
              <View style={{ alignSelf: "center", paddingVertical: 10 }}>
                <Text
                  style={{
                    fontFamily: "Bayon-Regular",
                    fontSize: 22,
                    color: COLORS.MAIN,
                  }}
                >
                  {t("ចូលប្រើកម្មវិធី")}
                </Text>
              </View>

              <View
                style={{
                  width: width * 0.85,
                  alignSelf: "center",
                  paddingVertical: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "Kantumruy-Regular",
                      fontSize: 14,
                      color: COLORS.MAIN,
                    }}
                  >
                    {t("អ៉ីម៉ែល")}
                  </Text>
                </View>
                <TextInput
                  value={email}
                  onChangeText={(e) => setEmail(e)}
                  placeholder={t("បញ្ជូលអ៉ីម៉ែលរបស់អ្នក")}
                  style={styles.input}
                  keyboardType="email-address"
                />
              </View>
              <View
                style={{
                  width: width * 0.85,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 14,
                    color: COLORS.MAIN,
                  }}
                >
                  {t("ពាក្យសម្ងាត់")}
                </Text>
                <View style={styles.input}>
                  <TextInput
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    placeholder={t("បញ្ជូលពាក្យសម្ងាត់របស់អ្នក")}
                    style={styles.passInput}
                    secureTextEntry={openEye}
                    keyboardType="default"
                  />

                  {openEye ? (
                    <TouchableOpacity onPress={() => setOpenEye(!openEye)}>
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        style={{ color: COLORS.SUB, padding: 5 }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setOpenEye(!openEye)}>
                      <Ionicons
                        name="eye"
                        size={24}
                        style={{ color: COLORS.SUB, padding: 5 }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.conBtn}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => HandleLogin()}
                >
                  <View>
                    <Text
                      style={{
                        color: "#FFFF",
                        fontFamily: "Bayon-Regular",
                        fontSize: 16,
                      }}
                    >
                      {t("ចូលប្រើកម្មវិធី")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View className="flex-row w-full items-center">
                  <View className="flex-row w-[50%] my-2 items-center">
                    <Checkbox
                      style={{ padding: 8, borderColor: COLORS.MAIN }}
                      value={isChecked}
                      onValueChange={setChecked}
                      color={isChecked ? COLORS.MAIN : undefined}
                    />
                    <Text className="mx-2 text-sm font-bayon leading-7 text-[#3C6EFB]">
                      {t("ចងចាំពាក្យសម្ងាត់")}
                    </Text>
                  </View>
                  <TouchableOpacity className="flex-row w-[50%] my-2 items-end justify-end">
                    <Text
                      className="mx-2 text-sm font-bayon leading-7 text-[#3C6EFB]"
                      onPress={() => {
                        navigation.navigate("ForgetScreen");
                      }}
                    >
                      {t("ភ្លេចពាក្យសម្ងាត់?")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <Image
                source={require("../assets/Images/bottomImage.png")}
                style={{ height: 75, width: 150, resizeMode: "contain" }}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </RootLog>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#CCCC",
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
  },
  conBtn: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    width: "85%",
  },
  btn: {
    backgroundColor: COLORS.MAIN,
    marginVertical: 15,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  forgetPass: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  passInput: {
    width: "80%",
    fontSize: 16,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginLeft: 8,
    borderColor: COLORS.MAIN,
  },
});
