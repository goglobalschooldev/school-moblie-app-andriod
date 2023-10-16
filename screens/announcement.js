import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import Header from "../routes/header/Header";
import { useTranslation } from "react-multi-lang";
import { QUERY_ANNOUNCEMENT } from "../graphql/gql_announcement";
import { useQuery } from "@apollo/client";
import AnnouncementCard from "../components/Announcement";
import LoadingScreen from "../static/loading-screen";
import { COLORS } from "../color";

const Announcements = ({ navigation }) => {
  const t = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const {
    data: Announcement,
    loading: announcementLoading,
    error: announcementError,
    refetch: refetchAnnoucement,
  } = useQuery(QUERY_ANNOUNCEMENT, {
    variables: {
      page: currentPage,
      limit: limit,
      from: "",
      to: "",
      keyword: "",
      publish: true,
    },
    pollInterval: 2000,
    onCompleted: () => {
      // setCurrentPage(
      //   Announcement?.getAnnouncementsPagination?.paginator?.currentPage
      // );
    },
    onError: async (error) => {
      console.log(error.message, "Error Announcement");
    },
  });

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    // Fetch data for the current page from the data source
    refetchAnnoucement();
    // Update the 'data' state variable with the fetched data
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const iterationsArray = Array.from(
    { length: Announcement?.getAnnouncementsPagination?.paginator?.totalPages },
    (_, index) => index + 1
  );

  // if (announcementLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />

      <SafeAreaView>
        <Header title={t("សិក្សា")} navigation={navigation} />
      </SafeAreaView>

      {Announcement?.getAnnouncementsPagination?.data.length === 0 ? (
        <>
          <View className=" w-full h-[90%] justify-center self-center items-center">
            <Text className="font-kantunruy-regular text-gray text-sm leading-8">
              {t("មិនមានទិន្នន័យ")}
            </Text>
          </View>
        </>
      ) : (
        <>
          <ScrollView>
            <View style={{ marginTop: 14 }} />

            {announcementLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              Announcement?.getAnnouncementsPagination?.data?.map((item) => (
                <TouchableOpacity
                  key={item?._id}
                  onPress={() =>
                    navigation.navigate("AnnouncementDetail", { data: item })
                  }
                >
                  <AnnouncementCard {...item} loading={announcementLoading} />
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              // backgroundColor: COLORS.MAIN,
              height: 50,
              // position: "absolute",
              // bottom: 0,
            }}
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {Announcement?.getAnnouncementsPagination?.paginator?.hasPrevPage ? (
          <TouchableOpacity
            onPress={() => {
              handlePreviousPage();
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.MAIN,
              width: 30,
              height: 30,
              borderColor: COLORS.WHITE,
              borderWidth: 1,
            }}
          >
            <Entypo name="arrow-bold-left" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        ) : (
          <Entypo name="arrow-bold-left" size={24} color={COLORS.MAIN} />
        )} */}

              {iterationsArray.map((iteration) => (
                <TouchableOpacity
                  key={iteration}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      iteration === currentPage ? COLORS.MAIN : COLORS.WHITE,
                    width: iteration === currentPage ? 35 : 30,
                    height: iteration === currentPage ? 35 : 30,
                    borderRadius: 50,
                    marginRight: 8,
                  }}
                  onPress={() => setCurrentPage(iteration)}
                >
                  <Text
                    style={{
                      fontSize: iteration === currentPage ? 16 : 12,
                      color:
                        iteration === currentPage ? COLORS.WHITE : COLORS.MAIN,
                    }}
                  >
                    {iteration}
                  </Text>
                </TouchableOpacity>
              ))}
              {/* {Announcement?.getAnnouncementsPagination?.paginator?.hasNextPage ? (
          <TouchableOpacity
            onPress={() => {
              handleNextPage();
            }}
          >
            <Entypo name="arrow-bold-right" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        ) : (
          <Entypo name="arrow-bold-right" size={24} color={COLORS.WHITE} />
        )} */}
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

export default Announcements;
