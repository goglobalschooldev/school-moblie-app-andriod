import React, { useContext, useMemo } from "react";
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

export default function HeaderSetting({ title, navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, mobileDBCtx } = useContext(DataController);
  // console.log(mobileDBCtx,"Header")
  //
  let ProfileImage = accountDBCtx?.user?.profileImage;
  // console.log(ProfileImage,"ProfileImage")

  const UserImage = useMemo(() => {
    const userImage =
      "https://storage.go-globalschool.com/api" + (mobileDBCtx || ProfileImage);
    return (
      <Image
        resizeMode="cover"
        style={{
          height: 28,
          width: 28,
          borderRadius: 30,
          position: "absolute",
        }}
        source={
          userImage === "https://storage.go-globalschool.com/api" || null
            ? // || "https://storage.go-globalschool.com/apinull"

              require("../../assets/Images/user.png")
            : { uri: userImage + "?time=" + new Date() }
        }
      />
    );
  }, [mobileDBCtx, ProfileImage]);

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
            <View style={{ alignSelf: "center" }}>
              <MaterialIcons
                name="sort"
                size={28}
                style={{ color: COLORS.MAIN }}
              />
            </View>
            <Text style={styles.textBar}>{title}</Text>
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
            <View
              style={{
                position: "absolute",
                bottom: 10,
                alignSelf: "flex-end",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <LanguageModal />
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar
                size={30}
                rounded
                ImageComponent={() => UserImage}
                overlayContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </TouchableOpacity> */}
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
    paddingLeft: 3,
    fontFamily: "Bayon-Regular",
  },
});
