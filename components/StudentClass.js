import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { Image } from "react-native";
import { ENROLLMENT_STUDENTS } from "../graphql/gql_enrollmentByStudents";
import { useQuery } from "@apollo/client";
import { getLanguage } from "react-multi-lang";

export default function StudentClass(props) {
  const { styleState, height, width } = useContext(StyleController);
  const studentImage =
    "https://storage.go-globalschool.com/api" + props?.profileImg;
  // console.log(props, "props");

  const {
    data: enrollmentStudent,
    loading: enrollmentLoading,
    errors,
    refetch,
  } = useQuery(ENROLLMENT_STUDENTS, {
    variables: {
      studentId: props?._id,
    },
    onCompleted: ({ getEnrollmentByStudents }) => {
      // console.log(getEnrollmentByStudents, "test");
    },
    onError: (error) => {
      console.log(error.message, "error stuClass");
    },
  });

  let myClass = enrollmentStudent?.getEnrollmentByStudents?.map((item) => {
    return item?.gradeName + " " + item?.className;
  });
  let newClass = myClass?.join(", ");

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          width: width * 0.95,
          alignSelf: "center",
          borderRadius: 15,
          backgroundColor: props?.bgColor,
          justifyContent: "center",
          marginVertical: 5,
          height: height * 0.09,
        }}
      >
        <View
          style={{
            width: width * 0.95,
            flexDirection: "row",
            padding: 10,
            alignSelf: "center",
          }}
        >
          <View className="w-[20%]">
            {!studentImage ? (
              <Image
                source={require("../assets/Images/student.png")}
                className="h-14 w-14 rounded-full"
                style={{ borderColor: props.color, borderWidth: 0.5 }}
              />
            ) : (
              <Image
                source={
                  studentImage ===
                    "https://storage.go-globalschool.com/apinull" || null
                    ? require("../assets/Images/student.png")
                    : {
                        uri: studentImage,
                      }
                }
                className="h-14 w-14 rounded-full"
                style={{ borderColor: props.color, borderWidth: 0.5 }}
              />
            )}
          </View>
          <View className="flex flex-col w-[80%] justify-around">
            {getLanguage() === "en" ? (
              <Text
                className="font-kantunruy-regular text-[13px] leading-6"
                style={{ color: props?.color }}
              >
                {props?.englishName}
              </Text>
            ) : (
              <Text
                className="font-kantunruy-regular text-[13px] leading-6"
                style={{ color: props?.color }}
              >
                {props?.lastName + " " + props?.firstName}
              </Text>
            )}

            <View className="flex-row w-full">
              <Text style={{ color: props?.color }} numberOfLines={1}>
                {newClass}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
