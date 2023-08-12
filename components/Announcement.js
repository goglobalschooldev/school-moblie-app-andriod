import React, { useContext, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import AutoHeightImage from "react-native-auto-height-image";

export default function AnnouncementCard(props) {
  const { height, width } = useContext(StyleController);
  // console.log(props?.loading,"loading")
  const Image = useMemo(() => {
    // if (props?.loading) {
    //   return (
    //     <View style={styles.loadingStyle}>
    //       <ActivityIndicator size="large" color="#EFB419" />
    //     </View>
    //   );
    // } else {

    return (
      <AutoHeightImage
        source={{
          uri: props?.picture + "?time=" + new Date(),
          cache: "reload",
        }}
        resizeMode="contain"
        width={width * 0.95}
        style={{ alignSelf: "center", borderRadius: 15, margin: 5 }}
      />
    );
    // }
  }, [props?.picture]);

  return (
    <View>
      {Image}
      <View
        style={{
          width: width * 0.95,
          height: height * 0.05,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
          backgroundColor: "rgba(255,255,255,0.6054796918767507)",
          position: "absolute",
          bottom: 0,
          margin: 5,
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
