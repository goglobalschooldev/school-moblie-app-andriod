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
import { LOGIN_USER } from "../graphql/gql_login";
import { useMutation } from "@apollo/client/react";
import { DataController } from "../context/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION } from "../context/Reducer";
import ForgotPassword from "../components/modal/forgotPassword";
import RootLog from "../rootLog";
import { UPDATE_MOBILE_TOKEN } from "../graphql/gql_updateMobileToken";
import Checkbox from "expo-checkbox";
import { useTranslation, getLanguage, setTranslations } from "react-multi-lang";
import LanguageModal from "../components/modal/languageModal";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { GraphQLClient } from "graphql-request";
import { ADD_MOBILE_USER_TOKEN } from "../graphql/add_mobileUserToken";

export default function LoginScreen(props) {
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
    setNotiToken(tokenNoti);
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

  //endpoint2
  // const URI = "sms-endpoint.go-globalschool.com/graphql";
  const URI = "192.168.2.30:4300/graphql";
  const graphQLClient = new GraphQLClient(`http://${URI}`);

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
      // const token = (await Notifications.getDevicePushTokenAsync()).data
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

  //old noti token
  const [updateMobileToken] = useMutation(UPDATE_MOBILE_TOKEN, {
    onCompleted: ({ updateMobileToken }) => {
      // console.log(updateMobileToken, "test updateMobileToken");
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  const [login, { loading, data }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      // updateMobileToken({
      //   variables: {
      //     mobileUserId: login?.user?._id,
      //     newToken: {
      //       plateformToken: "android",
      //       deviceToken: notiToken,
      //     },
      //   },
      // });
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

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
      }
      // console.log(getUser, "getUser");
    }
    fetchData();
  }, []);

  const setMobileUserToken = async (userId) => {
    try {
      const addUsertoken = await graphQLClient.request(ADD_MOBILE_USER_TOKEN, {
        user: userId,
        token: notiToken,
        osType: "android",
      });
      console.log(addUsertoken, "addUsertoken");
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
      await login({
        variables: {
          email: email,
          password: password,
        },
        update(_, result) {
          // console.log(result?.data?.login, "result?.data?.login");
          if (result?.data?.login?.user) {
            registerForPushNotificationsAsync().then(async (token) => {
              console.log(token, "token");
              if (token) {
                await AsyncStorage.setItem("@tokenNoti", token);
              }
              setMobileUserToken(result?.data?.login?.user?.parentId?._id);
              // try {
              //   const addUsertoken = await graphQLClient.request(
              //     ADD_MOBILE_USER_TOKEN,
              //     {
              //       user: result?.data?.login?.user?.parentId?._id,
              //       token: token,
              //       osType: "android",
              //     }
              //   );
              //   console.log(addUsertoken, "addUsertoken");
              //   return addUsertoken;
              // } catch (error) {
              //   console.log(error.message, "erroraddUsertoken");
              // }
            });

            accountDBCtxDispatch({
              type: ACTION.LOGIN_USER,
              payload: result?.data?.login,
            });
            setLocalStorage(result?.data?.login);
            AsyncStorage.setItem("@user", JSON.stringify(user));
            AsyncStorage.setItem("@appState", JSON.stringify(true));
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
        },
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
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
                // backgroundColor: "pink",
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
                    // autoCompleteType="email"
                    // autoCorrect={true}
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
                  <View
                    style={{
                      paddingVertical: 10,
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        // backgroundColor: "pink",
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? COLORS.MAIN : undefined}
                      />
                      <View
                        style={{
                          alignSelf: "center",
                          justifyContent: "center",
                          paddingLeft: 5,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Kantumruy-Regular",
                            fontSize: 14,
                            color: COLORS.MAIN,
                            alignSelf: "center",
                          }}
                        >
                          {t("ចងចាំពាក្យសម្ងាត់")}
                        </Text>
                      </View>
                    </View>
                    {/* forgetPassword */}
                    <ForgotPassword />
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
    // backgroundColor: "pink",
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
    // backgroundColor: "pink"
  },
});
