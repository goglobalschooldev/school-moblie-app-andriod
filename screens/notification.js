import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header2 from "../routes/header/Header2";
import NotificationCard from "../components/notificationCard";
import { GraphQLClient } from "graphql-request";
import {
  GET_NOTIFICATION,
  VIEW_NOTIFICATION,
} from "../graphql/get_notification";
import { DataController } from "../context/Provider";
import { t } from "react-multi-lang";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import { MaterialIcons } from "@expo/vector-icons";
import LanguageModal from "../components/modal/languageModal";
import { Popover, Box } from "native-base";

const NotificationScreen = ({ navigation }) => {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx } = useContext(DataController);
  const [notiData, setNotiData] = useState("");
  const [notiLimit, setNotiLimit] = useState(10);
  const [loadingTime, setLoadingTime] = useState(true);

  const URI = "192.168.2.30:4300/graphql";
  const graphQLClient = new GraphQLClient(`http://${URI}`);

  useEffect(() => {
    async function fetchData() {
      try {
        const getNoti = await graphQLClient?.request(GET_NOTIFICATION, {
          userId: accountDBCtx?.user?.parentId?._id,
          limit: notiLimit,
        });
        // console.log(getNoti, "getNoti");
        if (getNoti) {
          setTimeout(() => {
            setLoadingTime(false);
          }, 1000);
          if (getNoti !== undefined) {
            setNotiData(getNoti?.getNotifications);
          }
        }
      } catch (error) {
        console.log(error.message, "errorGetNoti");
        // setLoadingTime(true);
        // setParentDataCheck(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [notiLimit]);

  const handleLoadMore = () => {
    setTimeout(() => {
      setNotiLimit(notiLimit + 8);
    }, 1000);
  };

  const handleClickNoti = async (notiID) => {
    // console.log(notiID, "notiID");
    try {
      const viewNotification = await graphQLClient.request(VIEW_NOTIFICATION, {
        notificationId: notiID,
        parentId: accountDBCtx?.user?.parentId?._id,
      });
      console.log(viewNotification, "viewNotification");
    } catch (error) {
      console.log(error.message, "errorViewNotification");
    }
  };

  if (loadingTime) {
    return (
      <View className="flex-1 justify-center">
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
        <View className="w-full bg-white">
          <View style={styles.header}>
            <View style={styles.insideBar}>
              <View
                className="w-[70%] flex-row items-center self-center"
                style={{ height: 50 }}
              >
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    height: 50,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <View className="self-center">
                    <MaterialIcons
                      name="arrow-back"
                      size={24}
                      color="#3C6EFB"
                    />
                  </View>
                  <View className="self-center">
                    <Text className="font-bayon text-base items-center text-[#3C6EFB] ml-2 leading-8">
                      {t("សេចក្ដីជូនដំណឹង")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                className="w-[30%] flex-row items-center self-center justify-end"
                style={{ height: 50 }}
              >
                <View className="h-full justify-center">
                  <Box>
                    <Popover
                      trigger={(triggerProps) => {
                        return (
                          <TouchableOpacity
                            {...triggerProps}
                            colorScheme="danger"
                          >
                            <Image
                              source={require("../assets/Images/bell-mark-as-read.png")}
                              className="h-7 w-7 rounded-full items-center mx-2"
                            />
                          </TouchableOpacity>
                        );
                      }}
                    >
                      <Popover.Content w="32">
                        <Popover.Arrow />
                        <Popover.Body>
                          <TouchableOpacity>
                            <Text className="font-kantunruy-regular font-bold text-sm text-main">
                              Mark as read
                            </Text>
                          </TouchableOpacity>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover>
                  </Box>
                </View>
                <View className="h-full right-1 items-center justify-center">
                  <LanguageModal />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View className="flex-1 w-full h-screen bg-white">
        {notiData?.length === 0 ? (
          <View className="flex-1 h-[100%] w-full bg-white flex-col items-center justify-center">
            <Text className="text-gray font-kantunruy-regular">
              {t("មិនមានទិន្នន័យ")}
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={notiData.slice(0, notiLimit)}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    handleClickNoti(item?._id);
                    navigation.navigate("LeaveDetials", { notiData: item });
                  }}
                >
                  <NotificationCard {...item} />
                </TouchableOpacity>
              )}
              vertical={true}
              showsVerticalScrollIndicator={false}
              snapToAlignment={"center"}
              decelerationRate={"fast"}
              onEndReached={handleLoadMore}
              ListFooterComponent={
                notiLimit === notiData?.length ? (
                  <TouchableOpacity
                    className="items-center p-1"
                    onPress={() => handleLoadMore}
                  >
                    <Text className="text-base font-kantunruy-regular text-main leading-10">
                      Loading...
                    </Text>
                  </TouchableOpacity>
                ) : null
              }
            />
            {/* {notiLimit === notiData?.length ? (
              <TouchableOpacity
                className="items-center p-1"
                onPress={() => setNotiLimit(notiLimit + 5)}
              >
                <Text className="text-base font-kantunruy-regular text-main leading-7">
                  {t("មើលបន្ថែម")}
                </Text>
              </TouchableOpacity>
            ) : null} */}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    shadowColor: COLORS.SUB,
    shadowOpacity: 0.2,
    alignSelf: "center",
  },
  insideBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
});

export default NotificationScreen;