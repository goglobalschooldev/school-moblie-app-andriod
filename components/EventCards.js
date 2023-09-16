import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import moment from "moment";
import localization from "moment/locale/km";
import { getLanguage } from "react-multi-lang";
import { StyleSheet } from "react-native";

export default function EventCards(props) {
  const { styleState, height, width } = useContext(StyleController);
  var km = moment().locale("km", localization);
  var en = moment().locale("en", localization);
  let eventDate = moment(props?.eventDate).format("YYYY-MM-DD");
  let endEventDate = moment(props?.endEventDate).format("YYYY-MM-DD");

  const SingleDate = () => {
    if (getLanguage() === "kh") {
      return (
        <Text
          style={{
            fontFamily: "Bayon-Regular",
            fontSize: 14,
            color: props?.color,
          }}
        >
          {moment(props?.eventDate).locale("km", localization).format("DD") +
            ", " +
            km.localeData().months(moment(props?.endEventDate)) +
            " " +
            moment(props?.endEventDate)
              .locale("km", localization)
              .format("YYYY")}
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
          {moment(props?.eventDate).locale("en", localization).format("DD") +
            ", " +
            en.localeData().months(moment(props?.endEventDate)) +
            " " +
            moment(props?.endEventDate)
              .locale("en", localization)
              .format("YYYY")}
        </Text>
      );
    }
  };

  const MultiDate = () => {
    if (getLanguage() === "kh") {
      return (
        <Text
          style={{
            fontFamily: "Bayon-Regular",
            fontSize: 14,
            color: props?.color,
          }}
        >
          {moment(props?.eventDate).locale("km", localization).format("DD") +
            " ~ " +
            moment(props?.endEventDate)
              .locale("km", localization)
              .format("DD") +
            ", " +
            km.localeData().months(moment(props?.endEventDate)) +
            " " +
            moment(props?.endEventDate)
              .locale("km", localization)
              .format("YYYY")}
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
          {moment(props?.eventDate).locale("en", localization).format("DD") +
            " ~ " +
            moment(props?.endEventDate)
              .locale("en", localization)
              .format("DD") +
            ", " +
            en.localeData().months(moment(props?.endEventDate)) +
            " " +
            moment(props?.endEventDate)
              .locale("en", localization)
              .format("YYYY")}
        </Text>
      );
    }
  };

  const Description = () => {
    if (getLanguage() === "kh") {
      return (
        <Text
          style={{
            fontFamily: "Kantumruy-Regular",
            fontSize: 13,
            color: props?.color,
          }}
        >
          {props?.eventNameKhmer}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            fontFamily: "Kantumruy-Regular",
            fontSize: 13,
            color: props?.color,
          }}
        >
          {props?.eventName}
        </Text>
      );
    }
  };

  if (eventDate === endEventDate) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            width: width * 0.95,
            alignSelf: "center",
            borderRadius: 15,
            backgroundColor: props.bgColor,
            justifyContent: "center",
            marginVertical: 5,
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
            <View
              style={{
                justifyContent: "center",
                width: 44,
                height: 44,
                backgroundColor: COLORS.WHITE,
                borderRadius: 50,
                alignSelf: "center",
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
              style={{ flexDirection: "column", left: 10, width: width * 0.75 }}
            >
              {SingleDate()}
              {Description()}
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            width: width * 0.95,
            alignSelf: "center",
            borderRadius: 15,
            backgroundColor: props.bgColor,
            justifyContent: "center",
            marginVertical: 5,
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
            <View
              style={{
                justifyContent: "center",
                width: 44,
                height: 44,
                backgroundColor: COLORS.WHITE,
                borderRadius: 50,
                alignSelf: "center",
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
              style={{ flexDirection: "column", left: 10, width: width * 0.75 }}
            >
              {MultiDate()}
              {Description()}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
