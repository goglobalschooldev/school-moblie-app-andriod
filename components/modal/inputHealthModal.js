import React, { useState, useContext, useEffect } from "react";
import { TextInput } from "react-native";
import { Alert } from "react-native";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";

export default function InputHealthModal({ parentsCmt, onChangeParentsCmt }) {
  const { styleState, height, width } = useContext(StyleController);
  const [openModalSignOut, setOpenModalSignOut] = useState(false);

  const handleCancel = () => {
    onChangeParentsCmt("")
    setOpenModalSignOut(!openModalSignOut)
  };

  const handleSave = () => {
    onChangeParentsCmt(parentsCmt)
    setOpenModalSignOut(!openModalSignOut)
  };


  return (
    <View style={{ width: "100%" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModalSignOut}
        onRequestClose={() => {
          setOpenModalSignOut(!openModalSignOut);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setOpenModalSignOut(!openModalSignOut)}
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
                  សូមមាតាបិតាបញ្ចូលមតិ
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
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderBottomWidth: 1,
                  borderColor: COLORS.SUB,
                  borderRadius: 8,
                }}
                placeholder="Please input here"
              />
              <View style={{ flexDirection: "row", height: 60 }}>
                <View style={{ width: width * 0.34 }}></View>
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
                    <TouchableOpacity
                     onPress={()=>handleCancel()}
                    >
                      <Text
                        style={{
                          color: "#FB3C3C",
                          fontFamily: "Kantumruy-Regular",
                          fontSize: 14,
                        }}
                      >
                        CANCEL
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
                        SAVE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setOpenModalSignOut(!openModalSignOut)}>
        <View
          style={{
            width: width * 0.18,
            height: height * 0.05,
            backgroundColor: COLORS.ORANGE_DARK,
            borderRadius: 8,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Kantumruy-Regular",
              fontSize: 13,
              color: COLORS.WHITE,
              alignSelf: "center",
            }}
          >
            បញ្ចូល
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
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
