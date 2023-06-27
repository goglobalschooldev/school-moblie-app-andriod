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
import Root from "../../root";
import Header2 from "../../routes/header/Header2";
import { StyleController } from "../../static/styleProvider";
import CalendarStrip from "react-native-calendar-strip";
import localization from "moment/locale/km";
import { COLORS } from "../../color";
import { useMutation, useQuery } from "@apollo/client";
import { EYS_REPORT } from "../../graphql/gql_EYSReport";
import FoodCard from "../FoodCard";
import ActivitiesCard from "../ActivitiesCard";
import HealthCard from "../HealthCard";
import FeedBackCard from "../FeedbackCard";
import ParentsRequest from "../ParentsRequest";
import { UPDATE_EYS } from "../../graphql/gql_UpdateEYS";
import { TouchableOpacity } from "react-native";
import NurseCmt from "./NurseCmt";
import ParentsCmt from "./ParentsCmt";
import InputHealth from "./InputHealth";
import { PartComponent } from "../../static/part-component";
import { useTranslation } from "react-multi-lang";


export default function ChildReport({ navigation, route }) {
  const { styleState, height, width } = useContext(StyleController);
  const [eysReport, setEysReport] = useState({});
  const [date, setDate] = useState(
    // moment(new Date()).locale("en", localization).format("YYYY-MM-DD")
    moment(new Date()).locale("en", localization)
  );
  const onDateSelected = (e) => {
    // setDate(moment(e).locale("en", localization).format("YYYY-MM-DD"));
    setDate(moment(e).locale("en", localization));
  };
  const { invoiceData } = route?.params;
  const [parentsCmt, onChangeParentsCmt] = useState("");
  const [healthInput, onChangeHealthInput] = useState("");
  const [report, setReport] = useState();
  const [isChecked, setChecked] = useState(false);
  const t = useTranslation();


  // var selectDate = date?.format("YYYY-MM-DD")
  // console.log(date, "data");

  //
  const {
    data: EysData,
    loading,
    refetch,
    error,
  } = useQuery(EYS_REPORT, {
    variables: {
      stuId: invoiceData?.studentId,
      date: date.format("YYYY-MM-DD"),
    },
    onCompleted: ({ getEYSReportPagination }) => {
      setEysReport(getEYSReportPagination?.data);
    },
    onError: (error) => {
      console.log(error.message, "EYS Error");
    },
  });
  useEffect(() => {
    refetch();
  }, [eysReport]);
  // console.log(eysReport, "eysReport");

  var Activities = eysReport[0]?.activities;
  var Food = eysReport[0]?.food;

  const filterFood = Food?.filter((e) => e?.qty !== 0);
  const filterActivities = Activities?.filter((i) => i?.qty !== 0);

  //
  const id = eysReport[0]?._id;

  const dateUpToDate = moment(eysReport[0]?.date)
    .locale("en", localization)
    .format("YYYY-MM-DD");

  const studentId = eysReport[0]?.stuId?._id;
  // console.log(studentId, "studentId");

  const [updateEYSReport, { updateLoding }] = useMutation(UPDATE_EYS, {
    onError: (e) => {
      console.log(e.message, "error");
    },
  });

  const handleUpdate = async () => {
    await updateEYSReport({
      variables: {
        updateEYSReport: {
          _id: id,
          date: dateUpToDate,
          stuId: studentId,
          parentsCheck: {
            description: healthInput,
            title: isChecked,
          },
          parentsComment: parentsCmt,
        },
      },
      update(_, result) {
        refetch();
        console.log(result?.updateEYSReport, "result eysUpdate");
      },
    });
  };
  useEffect(() => {
    onChangeParentsCmt(parentsCmt);
    onChangeHealthInput(healthInput);
  }, [parentsCmt, healthInput]);
  // console.log(eysReport, "eysReport");

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
          <Header2 title={t("របាយការណ៍កុមារដ្ឋាន")} navigation={navigation} />
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
            // calendarHeaderStyle={{ fontFamily: styleState.bayonKh, }}
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
            // innerStyle={[{ flex: 1, width: width }]}
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

          {filterFood?.length > 0 || filterActivities?.length > 0 ? (
            <View
              style={{
                flex: 1,
                width: width,
                height: height,
                // backgroundColor: "pink",
              }}
            >
              <ScrollView>
                <PartComponent title={"ផ្នែកអាហារ/ Food"}/>
                {filterFood?.map((item, index) => {
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
               
                <PartComponent title={"ផ្នែកសកម្មភាព/ Activities"}/>
                {filterActivities?.map((items, index) => {
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

                <PartComponent title={"ផ្នែកសុខភាព/ Health"}/>
                <HealthCard eysReport={eysReport} />

                <PartComponent title={"មតិយោបល់/ Feedback"}/>
                <NurseCmt eysReport={eysReport} />
                <ParentsCmt eysReport={eysReport} />
                <FeedBackCard eysReport={eysReport} />

                <PartComponent title={"ផ្នែកបញ្ចូលព័ត៌មាន/ Input information"}/>
                <InputHealth
                  healthInput={healthInput}
                  onChangeHealthInput={onChangeHealthInput}
                  isChecked={isChecked}
                  setChecked={setChecked}
                />
                <ParentsRequest
                  parentsCmt={parentsCmt}
                  onChangeParentsCmt={onChangeParentsCmt}
                />
                <TouchableOpacity onPress={() => handleUpdate()}>
                  <View
                    style={{
                      width: width * 0.95,
                      height: height * 0.05,
                      backgroundColor: COLORS.MAIN,
                      alignSelf: "center",
                      justifyContent: "center",
                      borderRadius: 14,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Bayon-Regular",
                        fontSize: 14,
                        color: COLORS.WHITE,
                        alignSelf: "center",
                      }}
                    >
                      {t("រក្សាទុក")}
                    </Text>
                  </View>
                </TouchableOpacity>
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
    paddingBottom: 15
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
    // backgroundColor:'pink'
  },
  textEmpty: {
    alignSelf: "center",
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
  },
});
