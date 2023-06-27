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
import { GET_ANNOUCEMENTBYID } from "../../graphql/get_annoucementByID";
import { useQuery } from "@apollo/client";

export default function AnnouncementDetail({ navigation, route, loading }) {
  const { styleState, height, width } = useContext(StyleController);
  let item = route?.params;
  const { announcementId } = route?.params;
  // console.log(announcementId, "announcementId");

  const {
    data: Data,
    loading: announcementtLoading,
    errors,
    refetch: announcementRefetch,
  } = useQuery(GET_ANNOUCEMENTBYID, {
    variables: {
      id: announcementId,
    },
    pollInterval: 2000,
    onCompleted: ({ getAnnouncementById }) => {
      // console.log(getAnnouncementById, "getAnnouncementById");
    },
    onError: async (error) => {
      console.log(error.message, "Error event");
    },
  });
  // console.log(Data, "Data");

  if (loading || announcementtLoading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }

  if (announcementId !== "" && announcementId !== undefined) {
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
            <AnnoucementZoom
              load={item}
              dataNoti={Data}
              loading={loading}
              announcementtLoading={announcementtLoading}
            />

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
                {Data?.getAnnouncementById?.title}
              </Text>
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 14,
                  paddingTop: 5,
                  color: COLORS.MAIN,
                }}
              >
                {Data?.getAnnouncementById?.description}
              </Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

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
const styles = StyleSheet.create({
  customScrollBar: {
    borderRadius: 3,
    width: 6,
  },
  customScrollBarBackground: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
