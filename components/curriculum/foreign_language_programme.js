import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Image,
  Button,
  animated,
} from "react-native";
import React from "react";
import Header3 from "../../routes/header/Header3";
import { COLORS } from "../../color";

const ForeignLanguageProgramme = ({ navigation }) => {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        <Header3 navigation={navigation} />
      </SafeAreaView>
      <ImageBackground
        source={require("../../assets/Images/Dashboard.png")}
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
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "center",
            }}
          >
            Foreign Language Programme
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
            This programme is following the National British Curriculum using
            Oxford University Press coursebooks. Our teachers are from The
            United States, New Zealand, England, and Australia and in each
            class, they too are also accompanied by at least one teaching
            assistant.
          </Text>
          <Image
            source={{
              uri: "https://storage-server.go-globalschool.com/client/storage:visitorCms/folder:visitor_image/fileName:1aed09f5-1ff6-4a3a-86b5-aa7b6b6d1f990962023jpeg.png/user:6496a86994a0be08ee6c9e15/key:Odsfm9Oz8DQmPsAlQg13Rh2OdwaCSyvoAcgBAiE6dQs",
            }}
            resizeMode="cover"
            style={{
              height: 200,
              width: "90%",
              marginTop: "5%",
            }}
          />
          <Text
            style={{
              fontFamily: "Kantumruy-Regular",
              fontSize: 18,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            Early Foundation Stage
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
            Students age from 3 to 6 years old are getting to develop and
            improve their fundamental background and foundations of languages in
            different subjects such as Maths, Science, Literacy, Phonics, and
            more. Here students get to express themselves through play-teaching
            and creative games.
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            SUB-PROGRAMME
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Preschool
          </Text>

          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Kindergarten
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Reception
          </Text>

          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            How Children Will Learn
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Alphabet letters, sounds, and recognition
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● A lot interactions with their hands and the environment
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Toys and play times
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            What Children Will Learn
          </Text>
          <Image
            source={{
              uri: "https://storage-server.go-globalschool.com/client/storage:visitorCms/folder:visitor_image/fileName:b707bbc8-fa7c-4d2f-a733-b6680f06f9a20962023jpeg.png/user:6496a86994a0be08ee6c9e15/key:Odsfm9Oz8DQmPsAlQg13Rh2OdwaCSyvoAcgBAiE6dQs",
            }}
            resizeMode="cover"
            style={{
              height: 200,
              width: "90%",
              marginTop: "5%",
            }}
          />
          <Text
            style={{
              fontFamily: "Kantumruy-Regular",
              fontSize: 18,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            Key Stage 1 and Key Stage 2
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
            For these two stages, students are getting to experience actual
            subject books such as English Literacy, Mathematics, Science,
            Geography, Phonics/Grammar, and Chinese.
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            SUB-PROGRAMME
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Key Stage 1
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
            - Year 1
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
            - Year 2
          </Text>

          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Key Stage 2
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
            - Year 3
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
            - Year 4
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
            - Year 5
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
            - Year 6
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            How Children Will Learn
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Subject Textbooks
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Both in teacher and student centered learning
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Indoor and outdoor classroom facilitated by the teachers
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Hand-on experiences
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            What Children Will Learn
          </Text>
          <Image
            source={{
              uri: "https://storage-server.go-globalschool.com/client/storage:visitorCms/folder:visitor_image/fileName:045f10a4-2495-48e1-b99a-7cf599c022360962023jpeg.png/user:6496a86994a0be08ee6c9e15/key:Odsfm9Oz8DQmPsAlQg13Rh2OdwaCSyvoAcgBAiE6dQs",
            }}
            resizeMode="cover"
            style={{
              height: 200,
              width: "90%",
              marginTop: "5%",
            }}
          />
          <Text
            style={{
              fontFamily: "Kantumruy-Regular",
              fontSize: 18,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            Key Stage 3 and Key Stage 4
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
            Here students are still focusing on their six main subjects, but
            students get to involve a lot more with real-world experiences and
            examples through field trips, internships, and opportunities to
            interact with local and international events and competitions.
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            SUB-PROGRAMME
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Key Stage 3
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
            - Year 7
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
            - Year 8
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
            - Year 9
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Key Stage 4
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
            - Year 10
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
            - Year 11
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 15,
              color: COLORS.PINK,
              width: "90%",
              textAlign: "left",
            }}
          >
            How Children Will Learn
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Textbooks
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Both teacher and student centred
          </Text>

          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● Hand on experiences, field trips, and internships
          </Text>
          <Text
            style={{
              fontFamily: "Kantumruy-Bold",
              fontSize: 12,
              color: COLORS.MAIN,
              width: "90%",
              textAlign: "left",
            }}
          >
            ● World wide examinations
          </Text>

          <Image
            source={require("../../assets/Images/square-terminal.png")}
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

export default ForeignLanguageProgramme;
