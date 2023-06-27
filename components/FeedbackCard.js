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

  let request = eysReport[0]?.parentsRequest;
  let splitRequest = "";
  request?.map((e, index) => {
    if (index === 0) {
      splitRequest += " " + e;
    } else {
      splitRequest += ", " + e;
    }
    
  });


  // if (splitRequest === "សាប៊ូកក់សក់") {
  //   console.log("ok");
  // }else if(splitRequest === "សម្លៀកបំពាក់"){
  //   console.log("ll");
  // }else if(splitRequest === "កន្ទបទឹកនោម"){
  //   console.log("pp");
  // }
  
  

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 10,
        // paddingBottom: 5,
      }}
    >
      <View
        style={{
          width: width * 0.95,
          //   height: height * 0.09,
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
