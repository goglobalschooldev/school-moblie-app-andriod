import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import Header from "../routes/header/Header";
import { useTranslation } from "react-multi-lang";

const Schoolfee = ({ navigation }) => {
  const t = useTranslation();
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />

      <SafeAreaView>
        <Header title={t("School Fee")} navigation={navigation} />
      </SafeAreaView>
      <ImageBackground
        source={require("../assets/Images/Dashboard.png")}
        resizeMode="contain"
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingBottom: "10%",
          }}
        >
          <Image
            source={require("../assets/Images/school-logo.png")}
            resizeMode="contain"
            style={{
              height: 200,
              width: "90%",
              marginTop: "5%",
              borderRadius: 10,
            }}
          />
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Schoolfee;
