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
  Image,
  ActivityIndicator,
} from "react-native";
import { Divider } from "react-native-paper";
import { COLORS } from "../../color";
import PickupCard from "../PickupCard";
import SuccessModal from "./successModal";
import * as Location from "expo-location";
import { getDistance } from "geolib";

const PickupModal = ({ data }) => {
  const t = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [localtionData, setlocationData] = useState();

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

  if (distance <= 0) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
        <Pressable
          // style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <PickupCard />
        </Pressable>
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
  },
});

export default PickupModal;
