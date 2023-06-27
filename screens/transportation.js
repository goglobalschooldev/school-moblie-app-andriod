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
import { QUERY_STUDENTS } from "../graphql/gql_students";
import { useQuery } from "@apollo/client";
import { StyleController } from "../static/styleProvider";
import { DataController } from "../context/Provider";
import { ACTION } from "../context/Reducer";
import StudentSchoolVanCard from "../components/StudentSchVanCard";
import { GET_TRANSPORTATION } from "../graphql/get_Transportation";

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

  let ParentId = accountDBCtx?.user?.parentId;

  const {
    data,
    loading: loadingTransportation,
    refetch: refetchTransportation,
  } = useQuery(GET_TRANSPORTATION, {
    onCompleted: ({ getTransportation }) => {
      // console.log(getTransportation, "getTransportation");
      getTransportation?.map((item) => {
        if (item?.parentId?._id === ParentId?._id) {
          setParentDataCheck(true);
        } else {
          setParentDataCheck(false);
          // alert("Not match");
        }
      });
    },
    pollInterval: 1000,
    onError: (error) => {
      console.log(error.message, "error getTransportation");
    },
  });

  const {
    data: userDB,
    loading,
    refetch,
    error,
  } = useQuery(QUERY_STUDENTS, {
    variables: {
      parentId: ParentId?._id,
    },
    onCompleted: ({ getStudentsByParents }) => {
      // console.log(getStudentsByParents, "test");
    },
    onError: (error) => {
      console.log(error.message, "error getStudentsByParents");
    },
  });

  useEffect(() => {
    if (userDB) {
      refetch();
      studentsDBCtxDispatch({
        type: ACTION.QUERY_STUDENTS,
        payload: userDB?.getStudentsByParents,
      });
      setDataSubUser(userDB?.getStudentsByParents);
    }
  }, [userDB, ParentId]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false) && refetch());
  }, []);

  if (loading || refreshing || loadingTransportation) {
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
        <Header title={t("សេវាកម្មដឹកជញ្ជូន")} navigation={navigation} />
      </SafeAreaView>
      {parentDataCheck ? (
        <ScrollView
          // contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor="white"
            />
          }
        >
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
                paddingTop: 5,
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
                    {dataSubUser.map((load) => (
                      <TouchableOpacity
                        key={load?._id}
                        onPress={() =>
                          navigation.navigate("NotificationList", {
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
        </ScrollView>
      ) : (
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
