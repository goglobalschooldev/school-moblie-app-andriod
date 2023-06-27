import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { StyleController } from "../static/styleProvider";
import { COLORS } from "../color";
import { Divider } from "react-native-paper";
import { useTranslation } from "react-multi-lang";


export default function parentsRequest({ parentsCmt, onChangeParentsCmt }) {
  const { styleState, height, width } = useContext(StyleController);
  const [openParentsCmt, setOpenParentsCmt] = useState(false);
  const t = useTranslation();


  const handleCancel = () => {
    onChangeParentsCmt("");
    setOpenParentsCmt(!openParentsCmt);
  };

  const handleSave = () => {
    onChangeParentsCmt(parentsCmt);
    setOpenParentsCmt(!openParentsCmt);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          width: width * 0.95,
          //   height: height * 0.09,
          alignSelf: "center",
          borderRadius: 15,
          backgroundColor: COLORS.ORANGE_LIGHT,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: width * 0.92,
            alignSelf: "center",
            padding: 5,
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "pink",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View>
              <Text style={styles.text}>សូមមាតាបិតាផ្ដល់មតិយោបល់</Text>
            </View>
            <View>
              <Text style={styles.text}>Please parents comment</Text>
            </View>
          </View>
          {/* modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={openParentsCmt}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setOpenParentsCmt(!openParentsCmt);
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => setOpenParentsCmt(!openParentsCmt)}
            >
              <View style={styles.bgModal} />
            </TouchableWithoutFeedback>
            <View style={styles.centerModal}>
              <View style={styles.modalBox}>
                <View style={{ paddingTop: 10, flexDirection: "column" }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: "Kantumruy-Regular",
                        fontSize: 14,
                        color: COLORS.MAIN,
                      }}
                    >
                      {t("សូមមាតាបិតាបញ្ចូលមតិយោបល់")}
                    </Text>
                  </View>

                  <TextInput
                    // Inherit any props passed to it; e.g., multiline, numberOfLines below
                    editable
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => onChangeParentsCmt(text)}
                    value={parentsCmt}
                    style={{
                      width: width * 0.75,
                      height: height * 0.08,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderBottomWidth: 1,
                      borderColor: COLORS.SUB,
                      borderRadius: 8,
                    }}
                    placeholder={t("task.សូមបញ្ចូលនៅទីនេះ")}
                  />
                  <View style={{ flexDirection: "row", height: 60 }}>
                    <View style={{ width: width * 0.34 }} />
                    <View
                      style={{
                        width: width * 0.4,
                        justifyContent: "flex-end",
                        // backgroundColor: "pink",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity onPress={() => handleCancel()}>
                          <Text
                            style={{
                              color: "#FB3C3C",
                              fontFamily: "Kantumruy-Regular",
                              fontSize: 14,
                            }}
                          >
                            {t("បោះបង់")}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSave()}>
                          <Text
                            style={{
                              color: COLORS.MAIN,
                              fontFamily: "Kantumruy-Regular",
                              fontSize: 14,
                            }}
                          >
                            {t("រក្សាទុក")}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => setOpenParentsCmt(!openParentsCmt)}
          >
            <View
              style={{
                width: width * 0.25,
                height: height * 0.05,
                backgroundColor: "#E38326",
                borderRadius: 8,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 14,
                  color: COLORS.WHITE,
                  alignSelf: "center",
                }}
              >
                {t("បញ្ចូល")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Divider
          style={{
            borderColor: COLORS.ORANGE_DARK,
            borderWidth: 0.5,
            width: width * 0.9,
            alignSelf: "center",
            // margin: 8,
          }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontFamily: "Kantumruy-Regular",
              fontSize: 14,
              color: COLORS.ORANGE_DARK,
            }}
          >
            {parentsCmt}
          </Text>
        </View> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: "Kantumruy-Regular",
    fontSize: 14,
    color: COLORS.ORANGE_DARK,
    // padding: 2,
  },
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    // height: "23%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    // backgroundColor: "pink",
  },
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.6,
    position: "absolute",
  },
});
