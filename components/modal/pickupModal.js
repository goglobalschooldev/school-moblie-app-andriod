import React, { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { COLORS } from "../../color";
import PickupCard from "../PickupCard";
import SuccessModal from "./successModal";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import PickupLoadingCard from "../PickupLoadingCard";
import { TRANKING_STUDENTINPICKUP } from "../../graphql/TrackingStudentInPickUp";
import graphQLClient from "../../config/endpoint_2";
import PickingUpCard from "../PickingUpCard";

const PickupModal = ({ data }) => {
  const t = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [localtionData, setlocationData] = useState();
  const [trackingStatusPickup, setTrackingStatusPickup] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        setlocationData(location);
      } catch (error) {
        console.log(error.message);
        Alert.alert(
          t("ទីតាំងរបស់អ្នកត្រូវបានបិទ"),
          t("ដើម្បីមកយកកូនរបស់អ្នក សូមបើកទីតាំង។"),
          [{ text: t("យល់ព្រម"), onPress: () => console.log("OK Pressed") }]
        );
      }
    })();
  }, []);

  let latString = localtionData?.coords?.latitude;
  let longString = localtionData?.coords?.longitude;

  let distance = 0;
  if (latString !== undefined && longString !== undefined) {
    distance += getDistance(
      { latitude: 13.347800067199344, longitude: 103.84411070157363 },
      { latitude: latString, longitude: longString }
    );
  }
  // console.log(distance, "distance")
  const handleCancel = () => {
    setModalVisible(!modalVisible);
  };
  const handleIsVisible = () => {
    setIsVisible(!isVisible);
  };
  // console.log(modalVisible);
  const startPolling = () => {
    async function fetchData() {
      try {
        const TrackingStudentInPickUp = await graphQLClient.request(
          TRANKING_STUDENTINPICKUP,
          {
            studentId: data?._id,
          }
        );
        // console.log(TrackingStudentInPickUp?.trackingStudentInPickUp, "hello");
        if (TrackingStudentInPickUp) {
          setTrackingStatusPickup(
            TrackingStudentInPickUp?.trackingStudentInPickUp
          );
        }
        if (TrackingStudentInPickUp?.trackingStudentInPickUp === "picked") {
          setIsVisible(true);
        }
      } catch (error) {
        console.log(error.message, "Error TrackingStudentInPickUp");
      }
    }

    const id = setInterval(() => {
      // fetchData();
    }, 3000); // Polling interval in milliseconds
    setIntervalId(id);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  };

  const stopPolling = () => {
    clearInterval(intervalId);
    // console.log(intervalId);
  };

  if (distance <= 0) {
    return (
      <View style={styles.loadingStyle}>
        <PickupLoadingCard />
      </View>
    );
  } else {
    return (
      <View style={styles.centeredView}>
        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setIsVisible(!isVisible);
          }}
        >
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <View style={styles.bgModal} />
          </TouchableOpacity>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: "100%",
                  height: "75%",
                  justifyContent: "center",
                  // backgroundColor: "pink"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 14,
                    color: COLORS.MAIN,
                    alignSelf: "center",
                    padding: 10,
                    // backgroundColor: "red",
                    // paddingVertical:15
                  }}
                >
                  Succeed!!!!!!!!!!!!
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  width: "100%",
                  height: "25%",
                  position: "absolute",
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "pink",
                  borderTopWidth: 1,
                  borderTopColor: COLORS.SUB,
                }}
                onPress={(i) => {
                  handleIsVisible(i), stopPolling();
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 14,
                    color: COLORS.MAIN,
                  }}
                >
                  {t("យល់ព្រម")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible), stopPolling();
            }}
          >
            <View style={styles.bgModal} />
          </TouchableOpacity>
          {
            distance < 50 && distance > 0 ? (
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      width: "100%",
                      height: "75%",
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Bayon-Regular",
                        fontSize: 16,
                        color: COLORS.MAIN,
                        // paddingBottom:20
                      }}
                    >
                      {t("បញ្ជាក់ការទទួល")}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Kantumruy-Regular",
                        fontSize: 14,
                        color: COLORS.MAIN,
                        marginVertical: 10,
                      }}
                    >
                      {t("តើលោកអ្នកមកទទួលកូនមែនទេ?")}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: "25%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      position: "absolute",
                      bottom: 0,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopWidth: 1,
                        borderRightWidth: 0.5,
                        borderColor: COLORS.SUB,
                      }}
                      onPress={(i) => handleCancel(i)}
                    >
                      <Text
                        style={{
                          fontFamily: "Kantumruy-Regular",
                          fontSize: 14,
                          color: "#FB3C3C",
                        }}
                      >
                        {t("ទេ")}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopWidth: 1,
                        borderLeftWidth: 0.5,
                        borderColor: COLORS.SUB,
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      <SuccessModal
                        startPolling={startPolling}
                        setModalVisible={setModalVisible}
                        modalVisible={modalVisible}
                        data={data}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              // null }

              // {distance > 50 && distance === 0?
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      width: "100%",
                      height: "75%",
                      justifyContent: "center",
                      // backgroundColor: "pink"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Kantumruy-Regular",
                        fontSize: 14,
                        color: COLORS.MAIN,
                        alignSelf: "center",
                        padding: 10,
                        // backgroundColor: "red",
                        // paddingVertical:15
                      }}
                    >
                      {t("លោកអ្នកស្ថិតនៅឆ្ងាយ")}
                      {t("ពីសាលា មិនអាចទទួលកូនបានទេ។")}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: "25%",
                      position: "absolute",
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      // backgroundColor: "pink",
                      borderTopWidth: 1,
                      borderTopColor: COLORS.SUB,
                    }}
                    onPress={(i) => handleCancel(i)}
                  >
                    <Text
                      style={{
                        fontFamily: "Kantumruy-Regular",
                        fontSize: 14,
                        color: COLORS.MAIN,
                      }}
                    >
                      {t("យល់ព្រម")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
            // : null
          }
        </Modal>

        {/* {trackingStatusPickup === "picking" ? (
          <PickingUpCard />
        ) : ( */}
        <Pressable
          // style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <PickupCard />
        </Pressable>
        {/* )} */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  oppa: {
    opacity: 0.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 14,
    // padding: 35,
    width: "80%",
    height: "22%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
});

export default PickupModal;
