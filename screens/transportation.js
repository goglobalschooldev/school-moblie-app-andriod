import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../routes/header/Header";
import { useTranslation } from "react-multi-lang";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import { DataController } from "../context/Provider";
import StudentSchoolVanCard from "../components/StudentSchVanCard";
import { GET_STUDENT_TRANSPORTATION } from "../graphql/get_studentTransportation";
import graphQLClient from "../config/endpoint_2";

//
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Transportation = ({ navigation }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, studentsDBCtxDispatch } = useContext(DataController);
  const [refreshing, setRefreshing] = useState(false);
  const [dataSubUser, setDataSubUser] = useState([]);
  const t = useTranslation();
  const [parentDataCheck, setParentDataCheck] = useState(false);
  const [loadingTime, setLoadingTime] = useState(true);

  let ParentId = accountDBCtx;

  useEffect(() => {
    async function fetchData() {
      try {
        const getStuTransportation = await graphQLClient.request(
          GET_STUDENT_TRANSPORTATION,
          {
            id: ParentId?.uid,
          }
        );
        // console.log(getStuTransportation, "getStuTransportation");
        if (getStuTransportation) {
          setLoadingTime(false);
          setParentDataCheck(true);
          if (getStuTransportation !== undefined) {
            setDataSubUser(
              getStuTransportation?.getStudentTransportationByMobileUser
            );
          }
        }
      } catch (error) {
        console.log(error.message, "errorGetStuTransportation");
        setLoadingTime(true);
        setParentDataCheck(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false) && refetch());
  }, []);

  if (loadingTime) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        <Header title={t("សេវាកម្មដឹកជញ្ជូនសិស្ស")} navigation={navigation} />
      </SafeAreaView>
      {parentDataCheck ? (
        // <ScrollView
        //   // contentContainerStyle={styles.scrollView}
        //   showsVerticalScrollIndicator={false}
        //   refreshControl={
        //     <RefreshControl
        //       refreshing={refreshing}
        //       onRefresh={onRefresh}
        //       progressBackgroundColor="white"
        //     />
        //   }
        // >
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: COLORS.WHITE,
          }}
        >
          <View
            style={{
              width: width,
              alignSelf: "center",
              height: height * 0.29,
              backgroundColor: COLORS.WHITE,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: width * 0.95,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 20,
                  color: COLORS.MAIN,
                }}
              >
                {t("បុត្រធីតា")}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                width: width,
                alignSelf: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#E4E4E4",
              }}
            >
              <ImageBackground
                source={require("../assets/Images/Dashboard.png")}
                resizeMode="cover"
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  stickyHeaderIndices={[1]}
                >
                  {dataSubUser?.map((load) => (
                    <TouchableOpacity
                      key={load?._id}
                      onPress={() =>
                        navigation.navigate("TransportationList", {
                          data: load,
                        })
                      }
                    >
                      <StudentSchoolVanCard {...load} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </ImageBackground>
            </View>
          </View>
        </View>
      ) : (
        // </ScrollView>
        <View className=" w-full h-[90%] justify-center self-center items-center">
          <Text className="font-kantunruy-regular text-gray text-sm leading-8">
            {t("មិនមានទិន្នន័យ")}
          </Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Transportation;
