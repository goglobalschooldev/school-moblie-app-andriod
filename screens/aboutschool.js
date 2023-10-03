import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "../routes/header/Header";
import { useTranslation } from "react-multi-lang";
import { COLORS } from "../color";

const Aboutschool = ({ navigation }) => {
  const t = useTranslation();

  const Title1 = ({ title }) => {
    return (
      <Text
        style={{
          fontFamily: "Kantumruy-Bold",
          fontSize: 15,
          color: COLORS.MAIN,
        }}
      >
        {title}
      </Text>
    );
  };

  const Body1 = ({ text }) => {
    return (
      <Text
        style={{
          fontFamily: "Kantumruy-Regular",
          fontSize: 8,
          color: COLORS.MAIN,
        }}
      >
        {text}
      </Text>
    );
  };
  const Body2 = ({ text }) => {
    return (
      <Text
        style={{
          textAlign: "justify",
          fontFamily: "Kantumruy-Regular",
          fontSize: 8,
          color: COLORS.MAIN,
        }}
      >
        {text}
      </Text>
    );
  };
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        <Header title={t("About School")} navigation={navigation} />
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
            source={require("../assets/Images/new_event.jpg")}
            resizeMode="cover"
            style={{
              height: 200,
              width: "90%",
              marginTop: "5%",
              borderRadius: 10,
            }}
          />
          <View style={{ height: 50, justifyContent: "center" }}>
            <Title1 title={"About Us"} />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: 80,
              backgroundColor: COLORS.GREY,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/Images/new_event.jpg")}
              resizeMode="contain"
              style={{
                height: "100%",
                width: "30%",
                borderRadius: 10,
              }}
            />
            <View
              style={{
                paddingLeft: 10,
                width: "55%",
                justifyContent: "space-evenly",
              }}
            >
              <Title1 title={"Our Vision"} />
              <Body1
                text={
                  "To educate Cambodian future generations to become international human resources."
                }
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: 80,
              backgroundColor: COLORS.GREY,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Image
              source={require("../assets/Images/new_event.jpg")}
              resizeMode="contain"
              style={{
                height: "100%",
                width: "30%",
                borderRadius: 10,
              }}
            />
            <View
              style={{
                paddingLeft: 10,
                width: "55%",
                justifyContent: "space-evenly",
              }}
            >
              <Title1 title={"Our Mission"} />
              <Body1
                text={
                  "To provide comprehensive general knowledge to our children."
                }
              />
            </View>
          </View>
          <View style={{ width: "90%", height: 50, justifyContent: "center" }}>
            <Title1 title={"History of Go Global School"} />
          </View>
          <View style={{ width: "90%" }}>
            <Body2
              text={
                " Go Global School was created in 2015, but its history can be dated as far as 2013. In 2013, professor Lok Lundy and professor Chy Sangvath had come together with a group of other professors from Law Department and other departments to collect ideas and shares in starting up a company. With 62,600 shares collected, a company named Khmer Credits, a small loan company, had emerged and stayed successfully until now under the name of Go Credits."
              }
            />
          </View>
          <View style={{ width: "90%", height: 50, justifyContent: "center" }}>
            <Title1 title={"Our Team"} />
          </View>
          <View
            style={{
              width: "90%",
              height: 200,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ height: "100%", width: "49%" }}>
              <Image
                source={require("../assets/Images/user_phoem.jpg")}
                resizeMode="cover"
                style={{
                  height: "80%",
                  width: "100%",
                  borderRadius: 10,
                }}
              />
              <Title1 title={"Chy Sangvath"} />
              <Body1 text={"Board of Directors"} />
            </View>

            <View style={{ height: "100%", width: "49%" }}>
              <Image
                source={require("../assets/Images/user_phoem.jpg")}
                resizeMode="cover"
                style={{
                  height: "80%",
                  width: "100%",
                  borderRadius: 10,
                }}
              />
              <Title1 title={"Lok Lundy"} />
              <Body1 text={"Managing Director"} />
            </View>
          </View>
          <View style={{ width: "90%", height: 50, justifyContent: "center" }}>
            <Title1 title={"Contact us :"} />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: 50,
              alignItems: "flex-end",
            }}
          >
            <Title1 title={"Contact us :"} />
            <Body1 text={"076 777 2168"} />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Aboutschool;
