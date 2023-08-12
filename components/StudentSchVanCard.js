import React, { useContext } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import { getLanguage } from "react-multi-lang";

const StudentSchoolVanCard = (props) => {
  const { styleState, height, width } = useContext(StyleController);
  const studentImage =
    "https://storage.go-globalschool.com/api" + props?.profileImg;
  // console.log(studentImage, "studentImage");

  // console.log(props, "props")
  const StudentName = () => {
    if (getLanguage() === "en") {
      return (
        <Text
          style={{
            fontFamily: "Kantumruy-Regular",
            alignSelf: "center",
            color: COLORS.WHITE,
            fontSize: 14,
            alignItems: "center",
          }}
          numberOfLines={1}
        >
          {props?.englishName}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontFamily: "Kantumruy-Regular",
            alignSelf: "center",
            color: COLORS.WHITE,
            fontSize: 14,
            alignItems: "center",
          }}
          numberOfLines={1}
        >
          {props?.lastName + " " + props?.firstName}
        </Text>
      );
    }
  };

  if (props?.stuLoading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          width: width * 0.44,
          flexDirection: "row",
          marginTop: 5,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            height: height * 0.2,
            width: width * 0.38,
            justifyContent: "space-evenly",
            borderWidth: 1,
            borderColor: COLORS.ORANGE,
            borderRadius: 14,
            flexDirection: "column",
          }}
        >
          {!studentImage ? (
            <Image
              source={require("../assets/Images/student.png")}
              style={styles.stuImage}
            />
          ) : (
            <Image
              source={
                studentImage ===
                  "https://storage.go-globalschool.com/apinull" || null
                  ? require("../assets/Images/student.png")
                  : { uri: studentImage }
              }
              style={styles.stuImage}
            />
          )}
          <View
            style={{
              height: height * 0.036,
              width: width * 0.3,
              backgroundColor: COLORS.MAIN,
              alignSelf: "center",
              borderRadius: 5,
              justifyContent: "center",
            }}
          >
            {StudentName()}
          </View>
        </View>
      </View>
    );
  }
};

export default StudentSchoolVanCard;
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  stuImage: {
    width: 105,
    height: 105,
    borderRadius: 100,
    alignSelf: "center",
  },
});
