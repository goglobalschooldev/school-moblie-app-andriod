import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import { getLanguage } from "react-multi-lang";

const StudentCard = (props) => {
  const { styleState, height, width } = useContext(StyleController);
  const studentImage =
    "https://storage.go-globalschool.com/api" + props?.profileImg;
  // console.log(studentImage, "studentImage");

  const StudentName = () => {
    if (getLanguage() === "en") {
      return (
        <Text
          style={{
            fontFamily: "Kantumruy-Bold",
            alignSelf: "center",
            color: COLORS.gray,
            fontSize: 16,
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
            fontFamily: "Kantumruy-Bold",
            alignSelf: "center",
            color: COLORS.gray,
            fontSize: 16,
            alignItems: "center",
          }}
          numberOfLines={1}
        >
          {props?.lastName + " " + props?.firstName}
        </Text>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: width * 0.33,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          height: height * 0.21,
          justifyContent: "space-evenly",
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
              studentImage === "https://storage.go-globalschool.com/apinull" ||
              null
                ? require("../assets/Images/student.png")
                : { uri: studentImage }
            }
            style={styles.stuImage}
          />
        )}
        <View
          style={{
            width: width * 0.3,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {StudentName()}
        </View>
      </View>
    </View>
  );
};

export default StudentCard;
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  stuImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
});
