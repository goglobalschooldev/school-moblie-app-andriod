import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import { StyleController } from "../../static/styleProvider";
import { COLORS } from "../../color";
import { getKhmerNum } from "../../static/khmerNumber";
import { Divider } from "react-native-paper";
import { getEngNumber } from "../../static/engNumber";
import { getLanguage } from "react-multi-lang";
import PreviewTeacherImg from "./preiewTeacherImg";
import moment from "moment";
export const SubjectSchedule = (props) => {
  const { styleState, height, width } = useContext(StyleController);
  const [teacherName, setTeacherName] = useState();

  console.log(props, "props");
  const teacherImage = props?.day?.teacherProfileImg;

  const teacherLeader = props?.day;

  const timeSchedule = `${moment(props?.startTime)
    .locale("en-gb")
    .format("hh:mm")} - ${moment(props?.endTime)
    .locale("en-gb")
    .format("hh:mm")}`;

  console.log(timeSchedule, "timeSchedule");
  let startTime = timeSchedule.split(" - ");

  let startTimeFirst = getKhmerNum(startTime[0].split(":")[0]);
  let startTimelast = getKhmerNum(startTime[0].split(":")[1]);
  let endTimeFirst = getKhmerNum(startTime[1].split(":")[0]);
  let endTimelast = getKhmerNum(startTime[1].split(":")[1]);

  let startTimeEng = timeSchedule.split(" - ");

  let startTimeFirstEng = getEngNumber(startTimeEng[0].split(":")[0]);
  let startTimelastEng = getEngNumber(startTimeEng[0].split(":")[1]);
  let endTimeFirstEng = getEngNumber(startTimeEng[1].split(":")[0]);
  let endTimelastEng = getEngNumber(startTimeEng[1].split(":")[1]);

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
                  {props?.day?.subjectName}
                </Text>
                <Text
                  style={{
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 12,
                    color: props?.color,
                  }}
                  numberOfLines={1}
                >
                  {
                    getLanguage() === "en"
                      ? props?.day?.teacherName !== undefined
                        ? props?.day?.teacherName
                        : ""
                      : props?.day?.teacherName !== undefined
                      ? props?.day?.teacherName
                      : ""
                    // +
                    // " " +
                    // (props?.day?.teacherName !== undefined
                    //   ? props?.day?.teacherName
                    //   : "")
                  }
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
