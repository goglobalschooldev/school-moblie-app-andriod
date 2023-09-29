import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header2 from "../../routes/header/Header2";
import { StyleController } from "../../static/styleProvider";
import CalendarStrip from "react-native-calendar-strip";
import localization from "moment/locale/km";
import { COLORS } from "../../color";
import FoodCard from "../FoodCard";
import ActivitiesCard from "../ActivitiesCard";
import HealthCard from "../HealthCard";
import FeedBackCard from "../FeedbackCard";
import NurseCmt from "./NurseCmt";
import ParentsCmt from "./ParentsCmt";
import { PartComponent } from "../../static/part-component";
import { useTranslation } from "react-multi-lang";
import graphQLClient from "../../config/endpoint_2";
import { GET_EYSREPORTBYSTUDENT } from "../../graphql/GetEYSReportByStu";

export default function ChildReport({ navigation, route }) {
  const { styleState, height, width } = useContext(StyleController);
  const [eysReport, setEysReport] = useState({});
  const [date, setDate] = useState(
    // moment(new Date()).locale("en", localization).format("YYYY-MM-DD")
    moment(new Date()).locale("en", localization)
  );
  const onDateSelected = (e) => {
    setDate(moment(e).locale("en", localization).format("YYYY-MM-DD"));
    // setDate(moment(e).locale("en", localization));
  };
  const { invoiceData } = route?.params;
  const [loading, setLoading] = useState(true);
  const [parentsCmt, onChangeParentsCmt] = useState("");
  const [healthInput, onChangeHealthInput] = useState("");
  const t = useTranslation();
  const stuId = route?.params?.stuId;
  // console.log(stuId);
  // console.log(JSON.stringify(date).substring(1).substring(0, 10));
  useEffect(() => {
    async function fetchData() {
      try {
        const GetEYSReportForStudent = await graphQLClient.request(
          GET_EYSREPORTBYSTUDENT,
          {
            stuId: stuId?._id,
            date: JSON.stringify(date).replace('"', "").substring(0, 10),
          }
        );
        if (GetEYSReportForStudent) {
          setLoading(false);
          console.log(GetEYSReportForStudent?.getEYSReportByStu);
          setEysReport(GetEYSReportForStudent?.getEYSReportByStu);
        }
      } catch (error) {
        // console.log(error.message, "Error GetEYSReportForStudent");
        setLoading(false);
      }
    }
    const interval = setInterval(() => {
      // Your function logic here
      fetchData();
      // console.log("Function executed every 3 seconds");
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  const dateUpToDate = moment(eysReport?.date)
    .locale("en", localization)
    .format("YYYY-MM-DD");

  useEffect(() => {
    onChangeParentsCmt(parentsCmt);
    onChangeHealthInput(healthInput);
  }, [parentsCmt, healthInput]);

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        />
        <SafeAreaView>
          <Header2
            title={t("របាយការណ៍កុមារដ្ឋាន")}
            navigation={navigation}
            stuData={stuId}
          />
        </SafeAreaView>
        <View style={styles.container}>
          <CalendarStrip
            scrollable={true}
            scrollerPaging={true}
            style={styles.calendar}
            calendarColor={"#FFFF"}
            calendarHeaderStyle={{
              color: COLORS.MAIN,
              fontSize: 16,
              fontFamily: "Kantumruy-Regular",
              alignSelf: "center",
            }}
            headerText={moment(date)
              .locale("en", localization)
              .format("dddd, Do MMMM YYYY")}
            dateNumberStyle={{ color: COLORS.MAIN, fontSize: 14 }}
            dateNameStyle={{
              color: COLORS.MAIN,
              fontSize: 12,
              fontFamily: "Kantumruy-Regular",
            }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={date}
            highlightDateNameStyle={{
              color: "white",
              fontFamily: "Kantumruy-Regular",
              fontSize: 12,
            }}
            highlightDateNumberStyle={{
              color: "white",
              fontFamily: "Kantumruy-Regular",
              fontSize: 14,
            }}
            highlightDateContainerStyle={{
              backgroundColor: COLORS.MAIN,
              fontSize: 14,
              fontFamily: "Kantumruy-Regular",
            }}
            onDateSelected={onDateSelected}
            calendarAnimation={{ type: "sequence", duration: 20 }}
            dayContainerStyle={{
              borderWidth: 1,
              borderColor: COLORS.MAIN,
              fontSize: 14,
              fontFamily: "Kantumruy-Regular",
            }}
            upperCaseDays={true}
            calendarHeaderPosition="above"
            scrollToOnSelectedDate={true}
            shouldAllowFontScaling={true}
          />

          {eysReport?.food?.length > 0 || eysReport?.activities?.length > 0 ? (
            <View
              style={{
                flex: 1,
                width: width,
                height: height,
              }}
            >
              <ScrollView>
                <PartComponent title={"ផ្នែកអាហារ/ Food"} />
                {eysReport?.food?.map((item, index) => {
                  return (
                    <View key={index}>
                      <FoodCard
                        {...item}
                        bgColor={
                          index % 2 == 0
                            ? COLORS.BLUE_LIGHT
                            : COLORS.ORANGE_LIGHT
                        }
                        color={
                          index % 2 == 0 ? COLORS.BLUE_DARK : COLORS.ORANGE_DARK
                        }
                      />
                    </View>
                  );
                })}

                <PartComponent title={"ផ្នែកសកម្មភាព/ Activities"} />
                {eysReport?.activities?.map((items, index) => {
                  return (
                    <View key={index}>
                      <ActivitiesCard
                        {...items}
                        bgColor={
                          index % 2 == 0
                            ? COLORS.BLUE_LIGHT
                            : COLORS.ORANGE_LIGHT
                        }
                        color={
                          index % 2 == 0 ? COLORS.BLUE_DARK : COLORS.ORANGE_DARK
                        }
                      />
                    </View>
                  );
                })}

                <PartComponent title={"ផ្នែកសុខភាព/ Health"} />
                <HealthCard eysReport={eysReport} />
                <PartComponent title={"មតិយោបល់/ Feedback"} />
                <NurseCmt eysReport={eysReport} />
                <ParentsCmt eysReport={eysReport} />
                <FeedBackCard eysReport={eysReport} />
              </ScrollView>
            </View>
          ) : (
            <View style={styles.emptyStyle}>
              <Text style={styles.textEmpty}>{t("មិនមានទិន្នន័យ")}</Text>
            </View>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignSelf: "center",
    backgroundColor: COLORS.WHITE,
    paddingBottom: 15,
  },
  calendar: {
    // flex:1,
    height: 110,
    width: "100%",
    paddingTop: 5,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    alignSelf: "center",
  },
  categoryTitle: {
    fontFamily: "Bayon-Regular",
    fontSize: 14,
    left: 10,
    color: COLORS.MAIN,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  emptyStyle: {
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "center",
  },
  textEmpty: {
    alignSelf: "center",
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
  },
});
