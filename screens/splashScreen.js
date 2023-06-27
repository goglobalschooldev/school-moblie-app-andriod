import React, { useContext, useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Root from "../root";
import { StyleController } from "../static/styleProvider";

export default function SplashScreen() {
  const { styleState, width, height } = useContext(StyleController);

  useEffect(() => {
    let unmoted = false;
    setTimeout(async () => {}, 2000);
    return () => {
      unmoted = true;
    };
  }, []);
  return (
    <Root>
      <ImageBackground
        source={require("../assets/Images/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            width: width,
            height: height,
          }}
        >
          <View style={{ alignSelf: "center", position: "absolute", top: 150 }}>
            <Image
              source={require("../assets/Images/Logo.png")}
              style={{ width: 120, height: 120 }}
            />
          </View>
          <View
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: 50,
            }}
          >
            <Image
              source={require("../assets/Images/bottomImage.png")}
              style={{ height: 75, width: 150, resizeMode: "contain" }}
            />
          </View>
        </View>
      </ImageBackground>
    </Root>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
