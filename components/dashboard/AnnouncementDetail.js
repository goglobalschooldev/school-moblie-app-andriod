import React, { useContext, useMemo, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import Header3 from "../../routes/header/Header3";
import { StyleController } from "../../static/styleProvider";
import { COLORS } from "../../color";
import AnnoucementZoom from "./AnnoucementZoom";

export default function AnnouncementDetail({ navigation, route, loading }) {
  const { styleState, height, width } = useContext(StyleController);
  let item = route?.params;

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        <Header3 navigation={navigation} />
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          height: height * 1,
          backgroundColor: COLORS.WHITE,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AnnoucementZoom load={item} loading={loading} />
          <View
            style={{
              width: width * 0.98,
              alignSelf: "center",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Bayon-Regular",
                fontSize: 16,
                color: COLORS.MAIN,
              }}
            >
              {item?.data?.title}
            </Text>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                paddingTop: 5,
                color: COLORS.MAIN,
              }}
            >
              {item?.data?.description}
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
