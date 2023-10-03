import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { COLORS } from "../../color";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleController } from "../../static/styleProvider";
import { DataController } from "../../context/Provider";
import { MOBILE_USER } from "../../graphql/gql_MobileUser";
import { useQuery } from "@apollo/client";
import LanguageModal from "../../components/modal/languageModal";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-multi-lang";
import { Popover, Box, Button } from "native-base";
import { GER_USERINFO } from "../../graphql/Get_MobileUserLogin";

export default function Header({ title, navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, mobileDBCtx } = useContext(DataController);
  // console.log(accountDBCtx, "Header");

  const {
    data: UserData,
    loading: UserLoading,
    error: UserError,
    refetch: UserRefetch,
  } = useQuery(GER_USERINFO, {
    pollInterval: 2000,
    onCompleted: ({ getMobileUserLogin }) => {},
    onError: async (error) => {
      console.log(error.message, "Error getUser");
      if (error.message === "Not Authorized") {
        await AsyncStorage.removeItem("@userData");
        loginedDispatch({
          type: ACTION.LOGIN_USER,
          payload: false,
        });
      }
    },
  });

  useEffect(() => {
    UserRefetch();
  }, [UserData?.getMobileUserLogin]);
  let ProfileImage = UserData?.getMobileUserLogin?.profileImg;
  // console.log(ProfileImage, "ProfileImage");
  const t = useTranslation();

  const UserImage = useMemo(() => {
    const userImage =
      "https://storage.go-globalschool.com/api" + (mobileDBCtx || ProfileImage);
    if (
      userImage === "https://storage.go-globalschool.com/api" ||
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
          source={require("../../assets/Images/user.png")}
        />
      );
    } else {
      return (
        <Image
          resizeMode="contain"
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            position: "absolute",
          }}
          source={{ uri: userImage + "?time=" + new Date() }}
        />
      );
    }
  }, [mobileDBCtx, ProfileImage]);

  return (
    <View style={{ width: width, backgroundColor: COLORS.WHITE }}>
      <View style={styles.header}>
        <View style={styles.insideBar}>
          <TouchableOpacity
            style={{
              width: width * 0.65,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <MaterialIcons name="sort" size={26} color="#476CF1" />
            </View>
            <Text style={styles.textBar}>{title}</Text>
          </TouchableOpacity>
          <View
            style={{
              width: width * 0.35,
              height: 50,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 20,
            }}
          >
            {/* {title === t("ទំព័រដើម") ? (
              <TouchableOpacity
                style={{ paddingHorizontal: 20 }}
                onPress={() => navigation.navigate("NotificationScreen")}
              >
                <Image
                  source={require("../../assets/Images/bell.png")}
                  style={{ width: width * 0.055, height: height * 0.027 }}
                />
              </TouchableOpacity>
            ) : null} */}

            <View
              style={{
                paddingRight: title !== t("គណនី") ? 20 : 0,
                alignSelf: "flex-end",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <LanguageModal />
            </View>
            {title !== t("គណនី") ? (
              <Avatar
                size={23}
                rounded
                ImageComponent={() => UserImage}
                overlayContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: COLORS.ORANGE,
                  borderWidth: 1,
                  resizeMode: "cover",
                }}
              />
            ) : null}
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
    fontSize: 15,
    color: COLORS.MAIN,
    paddingLeft: 10,
    textAlignVertical: "bottom",
    fontFamily: "Bayon-Regular",
  },
});
