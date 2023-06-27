import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../color";
import Header2 from "../../routes/header/Header2";
import { StyleController } from "../../static/styleProvider";
import { useQuery } from "@apollo/client";
import { INVOICE_BY_STUDENT } from "../../graphql/gql_invoiceByStudent";
import { ACTION } from "../../context/Reducer";
import { DataController } from "../../context/Provider";
import moment from "moment";
import localization from "moment/locale/km";
import { useTranslation } from "react-multi-lang";


export default function AcedemicFees({ navigation, route }) {
  const { styleState, height, width } = useContext(StyleController);
  const { invoiceDBCtxDispatch } = useContext(DataController);
  const { invoiceData } = route?.params;
  const t = useTranslation();
  const [unitLng, setUnitLng] = useState("")


  const [showInvoice, setShowInvoice] = useState([]);
  const {
    data: invoice,
    loading,
    refetch,
  } = useQuery(INVOICE_BY_STUDENT, {
    variables: {
      studentId: invoiceData?.studentId,
    },
    onCompleted: ({ getInvoiceBystudentIdWithPagination }) => {
      // console.log(getInvoiceBystudentIdWithPagination,"Test")
    },
    onError: (error) => {
      console.log(error.message, "error");
    },
  });

  useEffect(() => {
    if (invoice) {
      refetch();
      invoiceDBCtxDispatch({
        type: ACTION.INVOICE_BY_STUDENT,
        payload: invoice?.getInvoiceBystudentIdWithPagination,
      });
      setShowInvoice(invoice?.getInvoiceBystudentIdWithPagination?.invoices);
    }
  }, [invoice]);

  // console.log(showInvoice, "showInvoice");
  if (loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
        />
        <SafeAreaView>
          <Header2 title={t("ប្រវត្តិបង់ថ្លៃសិក្សា")} navigation={navigation} />
        </SafeAreaView>
        <View
          style={{ flex: 1, height: height * 1, backgroundColor: COLORS.WHITE }}
        >
          <View style={styles.container}>
            <View style={styles.head}>
              <View style={{ width: width * 0.22, alignItems: "center" }}>
                <Text style={styles.title}>{t("កាលបរិច្ឆេទ")}</Text>
              </View>
              <View style={{ width: width * 0.36, alignItems: "center" }}>
                <Text style={styles.title}>{t("បង់ថ្លៃ")}</Text>
              </View>
              <View style={{ width: width * 0.2, alignItems: "center" }}>
                <Text style={styles.title}>{t("បរិយាយ")}</Text>
              </View>
              <View style={{ width: width * 0.17, alignItems: "center" }}>
                <Text style={styles.title}>{t("សរុប")}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {showInvoice?.length > 0 ? (
                showInvoice?.map((item) => {
                  let description = item?.additionalFee;
                  // console.log(item, "item");
                  const getDescription = () => {
                    // let des = moment(data?.startDate).format('YYYY')
                    // let des = `${t("unit.1Year")}`;
                    let des = "1 Year";

                    if (item?.month) {
                      return "1 Month";
                    }

                    if (item?.quarter) {
                      return "1 Quarter";
                    }

                    if (item?.academicTermId) {
                      return "1 Semester";
                    }
                    return des;
                  };
                  if (
                    item?.netAmount &&
                    item?.grossAmount &&
                    item?.startDate &&
                    item?.endDate
                  ) {
                    return (
                      <View style={styles.descriptionStyle} key={item?._id}>
                        <View
                          style={{
                            width: width * 0.21,
                            alignItems: "center",
                            // backgroundColor: "pink",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-start",
                            }}
                          >
                            <View style={{ justifyContent: "center" }}>
                              <Image
                                source={require("../../assets/Images/calendar-clock.png")}
                                style={{ width: 13, height: 13 }}
                              />
                            </View>
                            <View style={{ left: 3, justifyContent: "center" }}>
                              <Text style={styles.subtitle}>
                                {moment(item?.createdAt)
                                  .locale("en", localization)
                                  .format("YY-MM-DD")}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              borderColor: "#FEC888",
                              borderBottomWidth: 1,
                              borderRadius: 5,
                            }}
                          >
                            <View
                              style={{
                                width: width * 0.4,
                                // alignItems: "center",
                                padding: 2,
                                alignSelf: "flex-start",
                                // backgroundColor: "red",
                              }}
                            >
                              <Text style={styles.subtitle}>
                                ថ្លៃសិក្សា/Tuition Fee
                              </Text>
                            </View>
                            <View
                              style={{
                                width: width * 0.18,
                                alignItems: "center",
                                alignSelf: "center",
                              }}
                            >
                              <Text style={styles.subtitle}>
                                {getDescription()}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: width * 0.17,
                                alignItems: "center",
                                alignSelf: "center",
                              }}
                            >
                              <Text style={styles.subtitleDollar}>
                                ${item?.netAmount}
                              </Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            {description?.map((load) => {
                              // console.log(description,"load");
                              return (
                                <View
                                  key={load?._id}
                                  style={{
                                    flexDirection: "row",
                                    borderColor: "#FEC888",
                                    borderBottomWidth: 1,
                                    borderRadius: 5,
                                  }}
                                >
                                  <View
                                    style={{
                                      width: width * 0.4,
                                      // alignItems: "center",
                                      padding: 2,
                                      alignSelf: "flex-start",
                                      // backgroundColor: "pink",
                                    }}
                                  >
                                    <Text style={styles.subtitle}>
                                      {load?.incomeHead?.incomeHead}
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      width: width * 0.18,
                                      alignItems: "center",
                                      alignSelf: "center",
                                      // backgroundColor: "yellow",
                                    }}
                                  >
                                    <Text style={styles.subtitle}>
                                      {load?.countMonth}{" "}
                                      {load?.incomeHead?.unit}
                                      {/* {load?.incomeHead?.unit === "Month" ? (`${t("unit.month")}`): (`${t("unit.year")}`)} */}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      width: width * 0.17,
                                      alignItems: "center",
                                      // backgroundColor: "green",
                                      alignSelf: "center",
                                    }}
                                  >
                                    <Text style={styles.subtitleDollar}>
                                      ${load?.total}
                                    </Text>
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      </View>
                    );
                  }
                  {
                    return (
                      <View style={styles.descriptionStyle} key={item?._id}>
                        <View
                          style={{
                            width: width * 0.21,
                            alignItems: "center",
                            // backgroundColor: "pink",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-start",
                            }}
                          >
                            <View style={{ justifyContent: "center" }}>
                              <Image
                                source={require("../../assets/Images/calendar-clock.png")}
                                style={{ width: 13, height: 13 }}
                              />
                            </View>
                            <View style={{ left: 3, justifyContent: "center" }}>
                              <Text style={styles.subtitle}>
                                {moment(item?.createdAt)
                                  .locale("en", localization)
                                  .format("YY-MM-DD")}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                          {description?.map((load) => {

                            return (
                              <View
                                key={load?._id}
                                style={{
                                  flexDirection: "row",
                                  borderColor: "#FEC888",
                                  borderBottomWidth: 1,
                                  borderRadius: 5,
                                }}
                              >
                                <View
                                  style={{
                                    width: width * 0.4,
                                    // alignItems: "center",
                                    padding: 2,
                                    alignSelf: "flex-start",
                                    // backgroundColor: "red",
                                  }}
                                >
                                  <Text style={styles.subtitle}>
                                    {load?.incomeHead?.incomeHead}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    width: width * 0.18,
                                    alignItems: "center",
                                    alignSelf: "center",
                                    // backgroundColor: "yellow",
                                  }}
                                >
                                  <Text style={styles.subtitle}>
                                    {load?.countMonth} {load?.incomeHead?.unit}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    width: width * 0.17,
                                    alignItems: "center",
                                    // backgroundColor: "green",
                                    alignSelf: "center",
                                  }}
                                >
                                  <Text style={styles.subtitleDollar}>
                                    ${load?.total}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  }
                })
              ) : (
                //If empty data
                <View
                  style={{
                    width: width,
                    height: height * 0.7,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Kantumruy-Regular",
                      fontSize: 16,
                      color: COLORS.SUB,
                    }}
                  >
                    {t("មិនមានទិន្នន័យ")}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    justifyContent: "center",
  },
  head: {
    width: "95%",
    height: 50,
    backgroundColor: COLORS.BLUE_LIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    borderRadius: 5,
  },
  title: {
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
    color: COLORS.MAIN,
  },
  descriptionStyle: {
    width: "96%",
    backgroundColor: "#FEF5EA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 5,
    // backgroundColor: "red",
  },
  subtitle: {
    fontFamily: "Kantumruy-Regular",
    fontSize: 12,
    color: COLORS.MAIN,
  },
  subtitleDollar: {
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
    color: "#FB3C3C",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
