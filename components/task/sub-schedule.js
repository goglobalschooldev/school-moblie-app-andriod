import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { StyleController } from "../../static/styleProvider";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../color";
import { getKhmerNumber } from "../../static/khmerNumber";
import { padLeadingZeros } from "../../static/padLeadingZeros";
import { Divider } from "react-native-paper";
import { getEngNumber } from "../../static/engNumber";
import { getLanguage } from "react-multi-lang";
import { Image } from "react-native";
import PreviewTeacherImg from "./preiewTeacherImg";

export const SubjectSchedule = (props) => {
  const { styleState, height, width } = useContext(StyleController);
  const [teacherName, setTeacherName] = useState();

  // console.log(props,"props");
  const teacherImage =
    "https://storage.go-globalschool.com/api" +
    props?.leadTeacherId?.profileImg;

  const teacherLeader = props?.leadTeacherId;

  var startHour = (props?.startTime + "").split(".")[0];
  var startMin = (props?.startTime + "").split(".")[1];

  var endHour = (props?.endTime + "").split(".")[0];
  var endMin = (props?.endTime + "").split(".")[1];

  // console.log(startMin,"startMin")

  const timeSchedule = `${startHour}:${
    startMin > 0
      ? padLeadingZeros(
          startMin?.includes("0") || startMin > 9 ? startMin : startMin + "0",
          2
        )
      : "00"
  } - ${endHour}:${
    endMin > 0
      ? padLeadingZeros(
          endMin?.includes("0") || endMin > 9 ? endMin : endMin + "0",
          2
        )
      : "00"
  }`;

  let startTime = timeSchedule.split(" - ");
  let startTimeFirst = getKhmerNumber(startTime[0].split(":")[0]);
  let startTimelast = getKhmerNumber(startTime[0].split(":")[1]);
  let endTimeFirst = getKhmerNumber(startTime[1].split(":")[0]);
  let endTimelast = getKhmerNumber(startTime[1].split(":")[1]);

  let startTimeEng = timeSchedule.split(" - ");
  let startTimeFirstEng = getEngNumber(startTimeEng[0].split(":")[0]);
  let startTimelastEng = getEngNumber(startTimeEng[0].split(":")[1]);
  let endTimeFirstEng = getEngNumber(startTimeEng[1].split(":")[0]);
  let endTimelastEng = getEngNumber(startTimeEng[1].split(":")[1]);
  // console.log(props?.leadTeacherId,"teacher")

  useEffect(() => {
    if (
      (props?.leadTeacherId?.lastName &&
        props?.leadTeacherId?.firstName &&
        props?.leadTeacherId) !== undefined ||
      null
    ) {
      {
        getLanguage() === "kh"
          ? setTeacherName(
              props?.leadTeacherId?.lastName +
                " " +
                props?.leadTeacherId?.firstName
            )
          : setTeacherName(props?.leadTeacherId?.englishName);
      }
    } else {
      setTeacherName("");
    }
  }, []);

  if (props?.breakTime === false) {
    return (
      <View
        style={{
          width: width * 0.95,
          alignSelf: "center",
          flex: 1,
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: width * 0.95,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: height * 0.06,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: props?.color,
              }}
            >
              {getLanguage() === "kh"
                ? startTimeFirst + ":" + startTimelast
                : startTimeFirstEng + ":" + startTimelastEng}
            </Text>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: props?.color,
              }}
            >
              -
            </Text>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: props?.color,
              }}
            >
              {getLanguage() === "kh"
                ? endTimeFirst + ":" + endTimelast
                : endTimeFirstEng + ":" + endTimelastEng}
            </Text>
          </View>
          <View
            style={{
              width: width * 0.77,
              height: height * 0.09,
              alignSelf: "center",
              borderRadius: 15,
              backgroundColor: props.bgColor,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  backgroundColor: COLORS.WHITE,
                  borderRadius: 50,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#dcdcdc",
                }}
              >
                <PreviewTeacherImg
                  teacherImage={teacherImage}
                  teacherLeader={teacherLeader}
                />
                {/* <Image
                  source={{ uri: teacherImage }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignSelf: "center",
                  }}
                /> */}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  left: 15,
                  width: width * 0.6,
                  height: height * 0.06,
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bayon-Regular",
                    fontSize: 12,
                    color: props?.color,
                  }}
                  numberOfLines={1}
                >
                  {props?.subjectId?.subjectName}
                </Text>
                <Text
                  style={{
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 12,
                    color: props?.color,
                  }}
                  numberOfLines={1}
                >
                  {getLanguage() === "en"
                    ? props?.leadTeacherId?.englishName !== undefined
                      ? props?.leadTeacherId?.englishName
                      : ""
                    : (props?.leadTeacherId?.lastName !== undefined
                        ? props?.leadTeacherId?.lastName
                        : "") +
                      " " +
                      (props?.leadTeacherId?.firstName !== undefined
                        ? props?.leadTeacherId?.firstName
                        : "")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: width * 0.95,
          alignSelf: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: width * 0.95,
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: height * 0.06,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: "#FB3C3C",
              }}
            >
              {getLanguage() === "kh"
                ? startTimeFirst + ":" + startTimelast
                : startTimeFirstEng + ":" + startTimelastEng}
            </Text>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: "#FB3C3C",
              }}
            >
              -
            </Text>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: "#FB3C3C",
              }}
            >
              {getLanguage() === "kh"
                ? endTimeFirst + ":" + endTimelast
                : endTimeFirstEng + ":" + endTimelastEng}
            </Text>
          </View>
          <View
            style={{
              width: width * 0.77,
              height: height * 0.03,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Divider
              style={{ backgroundColor: "#FB3C3C", justifyContent: "center" }}
            />
            <View
              style={{
                // width: width * 0.4,
                backgroundColor: "white",
                position: "absolute",
                alignSelf: "center",
                padding: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 14,
                  color: "#FB3C3C",
                  alignSelf: "center",
                }}
                numberOfLines={1}
              >
                {getLanguage() === "kh" ? "ម៉ោងចេញលេង" : "Break Time"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  // }
};
