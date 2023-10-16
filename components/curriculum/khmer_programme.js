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

const KhmerProgramme = ({ navigation }) => {
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
            The curriculum is in accordance with the curriculum of the Ministry
            of Education, Youth and Sports, Cambodia. All teachers have
            completed pedagogical training programs and have many years of
            teaching experience. There are four curriculums of the Khmer
            Language Programme:
          </Text>
          <Image
            source={{
              uri: "https://storage-server.go-globalschool.com/client/storage:visitorCms/folder:visitor_image/fileName:7f98e64b-d5c4-42bb-a4ff-d7be99f0e7ab0962023jpeg.png/user:6496a86994a0be08ee6c9e15/key:Odsfm9Oz8DQmPsAlQg13Rh2OdwaCSyvoAcgBAiE6dQs",
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
              fontSize: 8,
              width: "90%",
              color: COLORS.MAIN,
              textAlign: "justify",
            }}
          >
            Early Childhood Education is focusing on educating children from age
            of 0 to 6 years old. This education stage is focusing on play-study
            environment in the absences of their families. Children at this age
            have high mental development and growth.
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
            ● Early Childhood Development and Support
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
            - Crèche
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
            - Nursery
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
              fontFamily: "Kantumruy-Regular",
              fontSize: 8,
              width: "90%",
              color: COLORS.MAIN,
              textAlign: "justify",
            }}
          >
            - Lower Kindergarten
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
            - Middle Kindergarten
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
            - Higher Kindergarten
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
            ● Indoor and Outdoor Play Activities
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
            ● Acting out each alphabet by their teachers and TAS
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
            ● Hand-on experiences in seeing and practising how each alphabet
            written, used for, and sounded like
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
              uri: "https://storage-server.go-globalschool.com/client/storage:visitorCms/folder:visitor_image/fileName:ea71f3df-9a47-4b8a-a337-55b3a7050ab00962023jpeg.png/user:6496a86994a0be08ee6c9e15/key:Odsfm9Oz8DQmPsAlQg13Rh2OdwaCSyvoAcgBAiE6dQs",
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
              fontSize: 8,
              width: "90%",
              color: COLORS.MAIN,
              textAlign: "justify",
            }}
          >
            To introduce students to subject books and expand their knowledge
            according to their living environments. Get hands-on experiences by
            exploring places and objects around them through field trips. There
            are two main stages in this education such as Lower Primary
            Education (Garde 1 -3) and Upper Primary Education (Grade 4-6).
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
            ● Lower Primary School
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
            - Grade 1
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
            - Grade 2
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
            - Grade 3
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
            ● Upper Primary School
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
            - Grade 4
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
            - Grade 5
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
            - Grade 6
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
            - Field trips
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
            ● Lectures are done in both teacher centered and student centered
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
            ● Problem solving
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
              uri: "https://storage-server.go-globalschool.com/client/storage:visitorCms/folder:visitor_image/fileName:1e331862-8faa-4c3a-bd72-85e7512b675f0962023jpeg.png/user:6496a86994a0be08ee6c9e15/key:Odsfm9Oz8DQmPsAlQg13Rh2OdwaCSyvoAcgBAiE6dQs",
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
              fontSize: 8,
              width: "90%",
              color: COLORS.MAIN,
              textAlign: "justify",
            }}
          >
            Secondary Education is milestone that students will have to
            experience before they can enter the real world. This education is
            divided into sub-programmes such as Secondary School (Grade 7-9) and
            High School (Grade 10-12). In this same education, students are
            having specialised teacher for subject they studied. Students are
            experiencing more than eleven subjects with different weights.
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
            ● Secondary School
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
            - Grade 7
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
            - Grade 8
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
            - Grade 9
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
            ● High School
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
            - Grade 10
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
            - Grade 11
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
            - Grade 12
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
            ● Subject Teachers
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
            ● Classes are scheduled by hours rather than repeating the same
            classes every day.
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
            ● Both teacher and student centered
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
            ● Hand on experiences and field trips
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

export default KhmerProgramme;
