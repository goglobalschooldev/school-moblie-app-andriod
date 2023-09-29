import React, { useContext, useState, useEffect } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { useTranslation } from "react-multi-lang";

export default function FeedBackCard({ eysReport }) {
  const { styleState, height, width } = useContext(StyleController);
  const [parentRequest, setParentRequest] = useState();
  const t = useTranslation();

  let request = eysReport?.parentsRequest;
  let splitRequest = "";
  request?.map((e, index) => {
    if (index === 0) {
      splitRequest += " " + e;
    } else {
      splitRequest += ", " + e;
    }
  });

  return (
    <>
      {request.length !== 0 ? (
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
              alignSelf: "center",
              borderRadius: 15,
              backgroundColor: COLORS.BLUE_LIGHT,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: width * 0.92,
                alignSelf: "center",
                padding: 5,
              }}
            >
              <View>
                <Text style={styles.text}>
                  {t("សូមមាតាបិតាជួយដាក់បន្ថែមឱ្យកូន៖")} {splitRequest}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
    color: COLORS.BLUE_DARK,
    padding: 2,
  },
});
