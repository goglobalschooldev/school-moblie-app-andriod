import React, { useContext, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import AutoHeightImage from "react-native-auto-height-image";
import moment from "moment";
import localization from "moment/locale/km";
import { getLanguage } from "react-multi-lang";

export default function AnnouncementCard(props) {
  const { height, width } = useContext(StyleController);

  const Image = useMemo(() => {
    return (
      <AutoHeightImage
        source={{
          uri: props?.coverSrc + "?time=" + new Date(),
          cache: "reload",
        }}
        resizeMode="contain"
        width={width * 0.95}
        style={{
          alignSelf: "center",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          borderColor: "gray",
          borderWidth: 0.2,
        }}
      />
    );
    // }
  }, [props?.coverSrc]);

  return (
    <View>
      {Image}
      <View
        style={{
          width: width * 0.95,
          height: height * 0.1,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          borderColor: "#dcdcdc",
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          backgroundColor: "rgba(255,255,255,0.6054796918767507)",
          // position: "absolute",
          bottom: 0,
          marginBottom: 15,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.MAIN,
            left: 5,
            fontSize: 16,
            fontFamily: "Bayon-Regular",
          }}
          numberOfLines={1}
        >
          {props?.title}
        </Text>
        <Text
          style={{
            color: COLORS.MAIN,
            left: 5,
            fontSize: 10,
            fontFamily: "Kantumruy-Regular",
          }}
          numberOfLines={1}
        >
          {getLanguage() === "kh"
            ? moment(props?.date)
                .locale("km", localization)
                .format("MMMM Do YYYY")
            : moment(props?.date)
                .locale("en", localization)
                .format("MMMM Do YYYY")}
        </Text>
        <Text
          style={{
            color: COLORS.MAIN,
            left: 5,
            fontSize: 10,
            fontFamily: "Kantumruy-Regular",
          }}
          numberOfLines={1}
        >
          {props?.description}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
