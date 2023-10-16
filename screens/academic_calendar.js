import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import Header from "../routes/header/Header";
import { useTranslation } from "react-multi-lang";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { COLORS } from "../color";

const Academic_calendar = ({ navigation }) => {
  const t = useTranslation();
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        <Header title={t("Curriculum")} navigation={navigation} />
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
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/goglobalplacementtest.appspot.com/o/photos%2Fstatic_images%2FVersion-Image.jpg?alt=media&token=4bb5c93e-c643-4d72-b058-da272f30431d",
            }}
            resizeMode="cover"
            style={{
              height: 200,
              width: "90%",
              marginTop: "5%",
              borderRadius: 10,
            }}
          />
          <Image
            source={require("../assets/Images/hat-round.png")}
            resizeMode="contain"
            style={{
              height: 50,
              width: "90%",
              marginTop: 10,
            }}
          />
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "center",
            }}
          >
            Curriculum for the academic year 2022-2023
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            Curriculum Vision
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Regular",
              fontSize: 8,
              width: "90%",
              color: COLORS.MAIN,
              textAlign: "justify",
            }}
          >
            The curriculum for 2022-2023 is to confirm the education of students
            as well as the people to be fully qualified with progress in all
            areas, with a balance between education, skill, behavior, physical
            fitness, and patriotic conscience to become Universal people.
          </Text>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "90%",
              height: 80,
              backgroundColor: COLORS.GREY,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate("KhmerProgramme")}
          >
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/goglobalplacementtest.appspot.com/o/photos%2Fstatic_images%2FVersion-Image.jpg?alt=media&token=4bb5c93e-c643-4d72-b058-da272f30431d",
              }}
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
                width: "70%",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Kantumruy-Bold",
                  fontSize: 15,
                  color: COLORS.MAIN,
                  width: "90%",
                  textAlign: "left",
                }}
              >
                Khmer Programme
              </Text>
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 8,
                  width: "90%",
                  color: COLORS.MAIN,
                  textAlign: "justify",
                }}
              >
                Khmer language program in accordance with the curriculum of the
                Ministry of Education, Youth, and Sports of Cambodia.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "90%",
              height: 80,
              backgroundColor: COLORS.GREY,
              borderRadius: 10,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate("ForeignLanguageProgramme")}
          >
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/goglobalplacementtest.appspot.com/o/photos%2Fstatic_images%2FVersion-Image.jpg?alt=media&token=4bb5c93e-c643-4d72-b058-da272f30431d",
              }}
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
                width: "70%",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  fontFamily: "Kantumruy-Bold",
                  fontSize: 15,
                  color: COLORS.MAIN,
                  width: "90%",
                  textAlign: "left",
                }}
              >
                Foreign Language Program
              </Text>
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 8,
                  width: "90%",
                  color: COLORS.MAIN,
                  textAlign: "justify",
                }}
              >
                The foreign language program is divided into two parts.
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            source={require("../assets/Images/square-terminal.png")}
            resizeMode="contain"
            style={{
              height: 20,
              width: "90%",
              marginTop: 10,
            }}
          />
          <Text
            style={{
              fontFamily: "Kantumruy-Regular",
              fontSize: 12,
              width: "90%",
              color: COLORS.PURPLE,
              textAlign: "center",
              marginTop: 4,
            }}
          >
            រៀបចំអភិវឌ្ឍដោយ៖
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Kantumruy-Bold",
                fontSize: 12,
                color: COLORS.PURPLE,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              ក្រុមហ៊ុនហ្គោគ្លប៊ល
            </Text>
            <Text
              style={{
                fontFamily: "Kantumruy-Bold",
                fontSize: 12,
                color: COLORS.PINK,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              អាយធី
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Academic_calendar;
