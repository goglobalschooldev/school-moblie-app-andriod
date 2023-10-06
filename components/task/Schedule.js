import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Header2 from "../../routes/header/Header2";
import moment from "moment";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";
import { useQuery } from "@apollo/client";
import { STU_SECTION } from "../../graphql/gql_Sections";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";
import { BtnDay } from "../../static/weekDay";
import { SubjectSchedule } from "./sub-schedule";
import { useTranslation } from "react-multi-lang";
import graphQLClient from "../../config/endpoint_2";
import { Get_Schedule_For_Mobile } from "../../graphql/Get_ScheduleForMobile";

export default function Schedule({ navigation, route }) {
  const { styleState, height, width } = useContext(StyleController);
  const [selectDay, setSelectDay] = useState("Monday");
  const [sectionData, setSectionData] = useState(null);
  const t = useTranslation();

  const { schedule } = route?.params;
  const stuData = route?.params?.stuId;
  let ClassId = schedule?.classesId;

  useEffect(() => {
    async function fetchData() {
      try {
        const GetScheduleForMobile = await graphQLClient.request(
          Get_Schedule_For_Mobile,
          {
            classeId: ClassId,
            day: selectDay.toLowerCase(),
          }
        );
        if (GetScheduleForMobile) {
          // console.log(GetScheduleForMobile, "GetScheduleForMobile");
          setSectionData(GetScheduleForMobile?.getScheduleForMobile);
        }
      } catch (error) {
        console.log(error.message, "Error GetScheduleForMobile");
      }
    }
    fetchData();
  }, [selectDay]);

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        <Header2
          title={t("កាលវិភាគសិក្សា")}
          navigation={navigation}
          stuData={stuData}
        />
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          height: height * 1,
          width: width,
          backgroundColor: COLORS.WHITE,
        }}
      >
        <View
          style={{
            height: height * 0.11,
            width: width,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <ScrollView
            horizontal={true}
            style={{
              width: width,
              // height: height * 0.14,
              // backgroundColor: "yellow"
            }}
          >
            <View
              style={{
                flex: 1,
                width: width,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                // backgroundColor: "red",
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <BtnDay
                  style={{
                    backgroundColor: "#E28842",
                  }}
                  dayName={t("ចន្ទ")}
                  onPress={() => setSelectDay("Monday")}
                />
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectDay === "Monday" ? COLORS.MAIN : "white",
                    margin: 5,
                    // top: 5,
                  }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <BtnDay
                  style={{ backgroundColor: "#B18DBD" }}
                  dayName={t("អង្គារ")}
                  onPress={() => setSelectDay("Tuesday")}
                />
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectDay === "Tuesday" ? COLORS.MAIN : "white",
                    margin: 5,
                    // top: 5,
                  }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <BtnDay
                  style={{ backgroundColor: "#C2C789" }}
                  dayName={t("ពុធ")}
                  onPress={() => setSelectDay("Wednesday")}
                />
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectDay === "Wednesday" ? COLORS.MAIN : "white",
                    margin: 5,
                    // top: 5,
                  }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <BtnDay
                  style={{ backgroundColor: "#76A886" }}
                  dayName={t("ព្រហ")}
                  onPress={() => setSelectDay("Thursday")}
                />
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectDay === "Thursday" ? COLORS.MAIN : "white",
                    margin: 5,
                    // top: 5,
                  }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <BtnDay
                  style={{ backgroundColor: "#8FABD1" }}
                  dayName={t("សុក្រ")}
                  onPress={() => setSelectDay("Friday")}
                />
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectDay === "Friday" ? COLORS.MAIN : "white",
                    margin: 5,
                    // top: 5,
                  }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <BtnDay
                  style={{ backgroundColor: "#A26982" }}
                  dayName={t("សៅរ៍")}
                  onPress={() => setSelectDay("Saturday")}
                />
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectDay === "Saturday" ? COLORS.MAIN : "white",
                    margin: 5,
                    // top: 5,
                  }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <BtnDay
                  style={{ backgroundColor: "#fc4141" }}
                  dayName={t("អាទិត្យ")}
                  onPress={() => setSelectDay("Sunday")}
                />
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor:
                      selectDay === "Sunday" ? COLORS.MAIN : "white",
                    margin: 5,
                    // top: 5,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        <ScrollView>
          {sectionData?.length > 0 &&
          sectionData[0]?.day?.subjectId !== null &&
          sectionData[0]?.breakTime === false ? (
            sectionData?.map((item, index) => {
              return (
                <View key={item?._id}>
                  <SubjectSchedule
                    {...item}
                    bgColor={
                      index % 4 === 0 ? COLORS.BLUE_LIGHT : COLORS.ORANGE_LIGHT
                    }
                    color={
                      index % 4 === 0 ? COLORS.BLUE_DARK : COLORS.ORANGE_DARK
                    }
                  />
                </View>
              );
            })
          ) : (
            <View
              style={{
                width: width,
                height: height * 0.7,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 16,
                  color: COLORS.SUB,
                }}
              >
                {t("មិនមានទិន្នន័យ")}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
