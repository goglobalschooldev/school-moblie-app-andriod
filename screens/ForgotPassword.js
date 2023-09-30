import {
  View,
  Text,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import RootLog from "../rootLog";
import auth from "../Auth/auth";
import { useTranslation } from "react-multi-lang";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [allow, setAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [openEye, setOpenEye] = useState(true);
  const [openEyeCom, setOpenEyeCom] = useState(true);
  const [loadingIn, setLoadingIn] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    async function fetchData() {
      let getData = await AsyncStorage.getItem("@userData");
      let getUser = getData === null ? {} : JSON.parse(getData);
      setEmail(getUser?.email);
      setIsChecked(getUser?.isChecked);
      console.log(getUser, "getUser");
    }
    fetchData();
  }, []);

  const setLocalDataUser = async ({ email, password, isChecked }) => {
    await AsyncStorage.setItem(
      "@userData",
      JSON.stringify({ email, password, isChecked })
    );
  };
  const handleDone = () => {
    if (password === "" || repeatPassword === "") {
      Alert.alert("Oop!", "Enter your password at least 8 length of character");
    } else if (password === repeatPassword) {
      setLoadingDone(true);
      setTimeout(async () => {
        setLoadingDone(false);
        await auth.forgortPassword(email, password).then((result) => {
          console.log(result, "forgortPassword");

          if (result?.status) {
            Alert.alert(result?.message, "succeed", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: t("ចូលប្រើកម្មវិធី"),
                onPress: () => {
                  navigation.navigate("LoginScreen");
                  setLocalDataUser({ email, password, isChecked });
                },
              },
            ]);
          } else {
            Alert.alert(t("សូមព្យាយាមម្ដងទៀត"), result?.message);
          }
        });
      }, 2000);
    } else {
      Alert.alert("Password do not match");
    }
  };

  if (loadingIn) {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        />
        <SafeAreaView className="flex bg-background">
          <ImageBackground
            source={require("../assets/Images/background.png")}
            resizeMode="cover"
          >
            <View className="flex h-screen w-full justify-center items-center">
              <View className="flex-col h-[100%] items-center my-4 justify-between ">
                <Image
                  source={require("../assets/Images/Logo.png")}
                  className="h-32 w-32 mt-10"
                />
                <Image
                  source={require("../assets/Images/bottomImage.png")}
                  resizeMode="contain"
                  className="h-[75] w-[150] mb-10"
                />
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }

  if (loadingDone) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#1080C1" />
      </View>
    );
  }
  return (
    <RootLog>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground
          source={require("../assets/Images/background.png")}
          resizeMode="cover"
          className="flex-1 justify-center"
        >
          <View className="h-screen w-full justify-evenly">
            <View className="flex w-[85%] h-screen items-center self-center flex-col">
              <View className="w-full flex-col justify-around items-center">
                <Image
                  source={require("../assets/Images/Logo.png")}
                  className="h-[120] w-[120] mt-10"
                />
                {!allow ? (
                  <View className="flex flex-col w-full items-center">
                    <Text className="font-KhmerOS_siemreap font-bold text-xl text-main my-2 tracking-wider">
                      Forgot Password?
                    </Text>
                    <Text className="font-KhmerOS_siemreap text-sm text-main my-1 text-center tracking-wider">
                      Enter your email below to reset your password.
                    </Text>
                  </View>
                ) : (
                  <View className="flex flex-col  items-center">
                    <Text className="font-KhmerOS_siemreap font-bold text-xl text-main my-2 tracking-wider">
                      Reset Password
                    </Text>
                    <Text className="font-KhmerOS_siemreap text-sm text-main my-1 text-center tracking-wider">
                      Create your new password, so you can login to your
                      account.
                    </Text>
                  </View>
                )}
              </View>
              {!allow ? (
                <>
                  <View className="w-full my-2 pt-9">
                    <View>
                      <Text className="text-sm text-main my-1 font-KhmerOS_siemreap">
                        Email
                      </Text>
                    </View>
                    <TextInput
                      value={email}
                      onChangeText={(e) => setEmail(e)}
                      placeholder={"Enter your email"}
                      keyboardType="email-address"
                      className="border border-blue-thin rounded-lg flex-row justify-between items-center text-sm px-2 font-KhmerOS_siemreap tracking-wide"
                      style={tailwind`h-[14] android:h-[12]`}
                    />
                  </View>
                  <View className="flex-row w-full justify-between">
                    <TouchableOpacity
                      className="w-[30%] bg-blue h-11 rounded-lg items-center justify-center my-4"
                      onPress={() => {
                        navigation.navigate("LoginScreen");
                      }}
                    >
                      <Text className="text-base text-white font-KhmerOS_siemreap font-bold">
                        Back
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="w-[30%] bg-blue h-11 rounded-lg items-center justify-center my-4"
                      onPress={() => {
                        setAllow(true);
                      }}
                    >
                      <Text className="text-base text-white font-KhmerOS_siemreap font-bold">
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View className="w-full my-2 pt-5">
                    <View>
                      <Text className="text-sm text-main my-1 font-KhmerOS_siemreap">
                        Create New Password
                      </Text>
                    </View>
                    <View
                      className="border border-blue-thin rounded-lg flex-row justify-between items-center text-sm px-2"
                      style={tailwind`h-[14] android:h-[12]`}
                    >
                      <TextInput
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                        placeholder={"Create your new password"}
                        keyboardType="default"
                        secureTextEntry={openEye}
                        style={tailwind`h-[14] android:h-[12]`}
                        className="w-[85%] text-sm font-KhmerOS_siemreap items-center"
                      />
                      {openEye ? (
                        <TouchableOpacity onPress={() => setOpenEye(!openEye)}>
                          <Ionicons
                            name="eye-off-outline"
                            size={24}
                            color="#1080C1"
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={() => setOpenEye(!openEye)}>
                          <Ionicons name="eye" size={24} color="#1080C1" />
                        </TouchableOpacity>
                      )}
                    </View>
                    {password?.length < 8 && password?.length !== 0 ? (
                      <View>
                        <Text className="text-xs text-red font-KhmerOS_siemreap p-1">
                          Password should be at least eight characters.
                        </Text>
                      </View>
                    ) : null}

                    <View>
                      <Text className="text-sm text-main my-1 font-KhmerOS_siemreap">
                        Comfirm Password
                      </Text>
                    </View>
                    <View
                      className="border border-blue-thin rounded-lg flex-row justify-between items-center text-sm px-2"
                      style={tailwind`h-[14] android:h-[12]`}
                    >
                      <TextInput
                        vvalue={repeatPassword}
                        onChangeText={(e) => setRepeatPassword(e)}
                        placeholder={"Comfirm new password"}
                        keyboardType="default"
                        secureTextEntry={openEyeCom}
                        style={tailwind`h-[14] android:h-[12]`}
                        className="w-[85%] text-sm font-KhmerOS_siemreap items-center"
                      />
                      {openEyeCom ? (
                        <TouchableOpacity
                          onPress={() => setOpenEyeCom(!openEyeCom)}
                        >
                          <Ionicons
                            name="eye-off-outline"
                            size={24}
                            color="#1080C1"
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => setOpenEyeCom(!openEyeCom)}
                        >
                          <Ionicons name="eye" size={24} color="#1080C1" />
                        </TouchableOpacity>
                      )}
                    </View>
                    {password === repeatPassword ? null : (
                      <View className="flex w-full items-start">
                        <Text className="text-xs text-red font-KhmerOS_siemreap p-1">
                          Password do not match.
                        </Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row w-full justify-between">
                    <TouchableOpacity
                      className="w-[30%] bg-blue h-11 rounded-lg items-center justify-center my-4"
                      onPress={() => setAllow(false)}
                    >
                      <Text className="text-base text-white font-KhmerOS_siemreap font-bold">
                        Back
                      </Text>
                    </TouchableOpacity>
                    <View className="w-[30%] bg-blue h-11 rounded-lg items-center justify-center my-4">
                      <TouchableOpacity
                        className="w-full h-11 items-center justify-center"
                        onPress={() => handleDone()}
                      >
                        <Text className="text-base text-white font-KhmerOS_siemreap font-bold">
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
              <View className="absolute bottom-16">
                <Image
                  source={require("../assets/Images/bottomImage.png")}
                  resizeMode="contain"
                  className="h-[75] w-[150]"
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </RootLog>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
});

export default ForgotPassword;
