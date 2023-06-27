import React, { useContext, useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Root from "../../root";
import Header2 from "../../routes/header/Header2";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import { COLORS } from "../../color";
import { useQuery } from "@apollo/client";
import { STU_ATTENDANCE } from "../../graphql/gql_Attendance";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";
import { Fontisto } from "@expo/vector-icons";
import { StyleController } from "../../static/styleProvider";
import localization from "moment/locale/km";
import { STU_SECTION } from "../../graphql/gql_Sections";
import { useTranslation } from "react-multi-lang";


export default function LunchAtt({ navigation, route }) {
  const { styleState, height, width } = useContext(StyleController);
  const { attendanceDBCtxDispatch, studentsDBCtx } = useContext(DataController);
  const { attendanceData } = route?.params;
  const [attendanceSection, setAttendanceSection] = useState()
  const t = useTranslation();

  let ClassId = attendanceData?.classId;
  let AcademicYearId = attendanceData?.academicYearId;
  let ProgramId = attendanceData?.programId;

  const {
    data: sectionDB,
    loading: sectionLoading,
    refetch: sectionRefetch,
    error: sectionError,
  } = useQuery(STU_SECTION, {
    variables: {
      classId: ClassId,
      academicYearId: AcademicYearId,
      programId: ProgramId,
    },
    onCompleted: ({ getSectionShiftByClassId }) => {
      setAttendanceSection(getSectionShiftByClassId)
      // console.log(getSectionShiftByClassId, "test");
    },
    onError: (error) => {
      console.log(error.message, "Error");
    },
  });

// console.log(attendanceSection?._id, "attendanceSection");
  //
  const [attendance, setAttendance] = useState([]);
  const {
    data: attendanceDB,
    loading,
    refetch,
    error,
  } = useQuery(STU_ATTENDANCE, {
    variables: {
      studentId: attendanceData?.studentId,
      sectionShiftId: attendanceSection?._id
    },
    onCompleted: (getAttendanceByStudentId) => {
      // console.log(getAttendanceByStudentId, "AttTest")
    },
    onError: (error) => {
      console.log(error, "AttError");
    },
  });
  // console.log(attendance,"attendance");

  useEffect(() => {
    if (attendanceDB) {
      refetch();
      attendanceDBCtxDispatch({
        type: ACTION.STU_ATTENDANCE,
        payload: attendanceDB?.getAttendanceByStudentIdForMobile,
      });
      setAttendance(attendanceDB?.getAttendanceByStudentIdForMobile);
    }
  }, [attendanceDB, attendanceData]);
  // console.log(attendance, "attendance");

  let markedDay = {};
  attendance?.map((item) => {
    if (item?.status === "PRESENT") {
      markedDay[
        moment(item?.attendanceDate)
          .locale("en", localization)
          .format("YYYY-MM-DD")
      ] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: "#0000FD",
          },
          text: {
            color: "white",
          },
        },
      };
    } else if (item?.status === "LATE") {
      markedDay[
        moment(item?.attendanceDate)
          .locale("en", localization)
          .format("YYYY-MM-DD")
      ] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: "#00AE50",
          },
          text: {
            color: "white",
          },
        },
      };
    } else if (item?.status === "ABSENT") {
      markedDay[
        moment(item?.attendanceDate)
          .locale("en", localization)
          .format("YYYY-MM-DD")
      ] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: "#FD0002",
          },
          text: {
            color: "white",
          },
        },
      };
    } else {
      markedDay[
        moment(item?.attendanceDate)
          .locale("en", localization)
          .format("YYYY-MM-DD")
      ] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: "#FEBE00",
          },
          text: {
            color: "yellow",
          },
        },
      };
    }
  });

  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <Root Header={<Header2 title={t("វត្តមានសិស្ស")} navigation={navigation} />}>
        <View style={{ height: height }}>
          <View>
            <Calendar
              horizontal={true}
              pagingEnabled={true}
              calendarWidth={width}
              enableSwipeMonths={true}
              markingType={"custom"}
              markedDates={markedDay}
              theme={{
                todayBackgroundColor: COLORS.BLUE_LIGHT,
                todayTextColor: COLORS.BLUE_DARK,
                selectedDayBackgroundColor: "black",
              }}
              
            />
          </View>
          <View
            style={{
              width: width * 0.4,
              height: height * 0.25,
              left: 20,
              paddingTop: 30,
            }}
          >
            <View style={styles.List}>
              <Fontisto
                name="rectangle"
                size={13}
                color="#0000FD"
                style={{ alignSelf: "center" }}
              />
              <Text style={[styles.textNote, styles.presentColor]}>
              {t("វត្តមាន")}
              </Text>  
            </View>
            <View style={styles.List}>
              <Fontisto
                name="rectangle"
                size={13}
                color="#00AE50"
                style={{ alignSelf: "center" }}
              />
              <Text style={[styles.textNote, styles.lateColor]}>{t("យឺត")}</Text>
            </View>
            <View style={styles.List}>
              <Fontisto
                name="rectangle"
                size={13}
                color="#FEBE00"
                style={{ alignSelf: "center" }}
              />
              <Text style={[styles.textNote, styles.permissionColor]}>
              {t("សុំច្បាប់")}
              </Text>
            </View>
            <View style={styles.List}>
              <Fontisto
                name="rectangle"
                size={13}
                color="#FD0002"
                style={{ alignSelf: "center" }}
              />
              <Text style={[styles.textNote, styles.absentColor]}>
                {t("អវត្តមាន")}
              </Text>
            </View>
          </View>
        </View>
      </Root>
    );
  }
}
const styles = StyleSheet.create({
  textNote: {
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
    left: 10,
  },
  List: {
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
  },
  presentColor: {
    color: "#0000FD",
  },
  lateColor: {
    color: "#00AE50",
  },
  permissionColor: {
    color: "#FEBE00",
  },
  absentColor: {
    color: "#FD0002",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
