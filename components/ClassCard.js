import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { useQuery } from "@apollo/client";
import { TOTAL_STUDENTS } from "../graphql/getTotalStudentForApp";
import { getLanguage } from "react-multi-lang";

const ClassCard = (props) => {
  const { styleState, height, width } = useContext(StyleController);
  const [totalStu, setTotalStu] = useState();
  const [dataTotal, setDataTotal] = useState("");

  // const { data, loading, refetch } = useQuery(TOTAL_STUDENTS, {
  //   onCompleted: ({ getTotalStudentForApp }) => {
  //     setTotalStu(getTotalStudentForApp);
  //     // console.log(getTotalStudentForApp, "getTotalStudentForApp")
  //   },
  //   onError: (error) => {
  //     console.log(error.message, "error stuClass");
  //   },
  // });

  // let filterData = totalStu?.filter((e) => {
  //   return (
  //     e?.classId === props?.classId && e?.gradeId === props?.gradeId
  //     // && e?.studentId === props?.studentId
  //   );
  // });

  // useEffect(() => {
  //   // refetch()
  //   if (filterData?.length > 0) {
  //     setDataTotal(filterData[0]?.total);
  //   }
  // }, [filterData]);

  const Students = () => {
    if (getLanguage() === "en") {
      return (
        <Text
          style={{
            fontFamily: "Bayon-Regular",
            fontSize: 14,
            color: props?.color,
          }}
        >
          {" "}
          {props?.totalStudent + " " + "pax"}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontFamily: "Bayon-Regular",
            fontSize: 14,
            color: props?.color,
          }}
        >
          {" "}
          {props?.totalStudent + " " + "នាក់"}
        </Text>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 10,
      }}
    >
      <View
        style={{
          width: width * 0.95,
          height: height * 0.09,
          alignSelf: "center",
          borderRadius: 15,
          backgroundColor: props?.bgColor,
          justifyContent: "center",
        }}
      >
        <View
          style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
        >
          <View
            style={{
              justifyContent: "center",
              width: 50,
              height: 50,
              backgroundColor: COLORS.WHITE,
              borderRadius: 50,
            }}
          >
            <Entypo
              name="graduation-cap"
              size={30}
              style={{
                alignSelf: "center",
                color: props?.color,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              left: 10,
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 14,
                  color: props?.color,
                }}
              >
                {props?.sectionShiftName + "  "}
              </Text>
              <Image
                source={require("../assets/Images/students.png")}
                style={{ width: 15, height: 15 }}
              />
              {Students()}
            </View>

            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: props?.color,
              }}
            >
              {props?.programme}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ClassCard;
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
