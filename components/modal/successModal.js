import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useTranslation } from "react-multi-lang";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../color";
import { CREATE_PICKUP } from "../../graphql/gql_createPickup";
import { STU_CARD_BY_STU_ID } from "../../graphql/gql_getStudentCardByStudentId";
import graphQLClient from "../../config/endpoint_2";
import { PICK_UPSTUDENT } from "../../graphql/PickingUpStudent";

export default function SuccessModal({
  startPolling,
  modalVisible,
  setModalVisible,
  data,
}) {
  const t = useTranslation();
  const [visible, setVisible] = useState(false);
  const [pickResult, setPickResult] = useState();

  const {
    data: stuData,
    loading: stuLoading,
    errors,
    refetch: stuRefetch,
  } = useQuery(STU_CARD_BY_STU_ID, {
    variables: {
      studentId: data?._id,
    },
    onCompleted: ({ getStudentCardByStudentID }) => {
      // console.log(getStudentCardByStudentID, "test");
    },
    onError: (error) => {
      console.log(error.message, "Error stuCard");
    },
  });
  // console.log(stuData, "stuData");

  const [createPickingUp, { loading, refetch }] = useMutation(CREATE_PICKUP, {
    onError: (e) => {
      console.log(e.message, "error");
    },
  });

  const PickingUpStudentsHandling = async (stuId) => {
    try {
      const createPickup = await graphQLClient.request(PICK_UPSTUDENT, {
        studentId: stuId,
      });
      console.log(createPickup?.pickingUpStudent?.status, "createPickup");
      setPickResult(createPickup?.pickingUpStudent?.status);
    } catch (error) {
      console.log(error.message, "error createPickup");
    }
  };

  const handleCreate = async () => {
    setVisible(!visible);
    PickingUpStudentsHandling(data?._id);
  };
  // console.log(pickResult, "pickResult")
  const handleClose = () => {
    setModalVisible(!modalVisible);
    setVisible(!visible);
  };

  if (stuLoading && loading) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <>
        {pickResult === true ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setVisible(!visible);
            }}
          >
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <View style={styles.bgModalSecond} />
            </TouchableOpacity>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    width: "100%",
                    height: "80%",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/Images/check-outline.gif")}
                    style={{ width: 110, height: 110 }}
                  />
                  <Text
                    style={{
                      fontFamily: "Kantumruy-Bold",
                      fontSize: 16,
                      color: COLORS.MAIN,
                      //   marginVertical: 15,
                    }}
                  >
                    {t("ជោគជ័យ")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "20%",
                    position: "absolute",
                    bottom: 0,
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderColor: COLORS.SUB,
                    justifyContent: "center",
                  }}
                  onPress={() => handleClose()}
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
          </Modal>
        ) : (
          <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setVisible(!visible);
            }}
          >
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <View style={styles.bgModalSecond} />
            </TouchableOpacity>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    width: "100%",
                    height: "80%",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/Images/cross-outline.gif")}
                    style={{ width: 110, height: 110 }}
                  />
                  <Text
                    style={{
                      fontFamily: "Kantumruy-Bold",
                      fontSize: 16,
                      color: "#FB3C3C",
                      //   marginVertical: 15,
                    }}
                  >
                    {t("បរាជ័យ")}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "20%",
                    position: "absolute",
                    bottom: 0,
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderColor: COLORS.SUB,
                    justifyContent: "center",
                  }}
                  onPress={() => handleClose()}
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
          </Modal>
        )}
        <TouchableOpacity
          onPress={() => {
            handleCreate();
            //  startPolling();
          }}
        >
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              width: 140,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: COLORS.MAIN,
              }}
            >
              {t("បាទ/ចា៎")}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
const styles = StyleSheet.create({
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
    height: "30%",
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
  bgModalSecond: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    position: "absolute",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
