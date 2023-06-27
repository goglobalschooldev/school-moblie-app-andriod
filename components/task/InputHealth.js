import React, { useState, useContext } from "react";
import Checkbox from "expo-checkbox";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";
import { useTranslation } from "react-multi-lang";


export default function InputHealth({
  healthInput,
  onChangeHealthInput,
  isChecked,
  setChecked,
}) {
  const { styleState, height, width } = useContext(StyleController);
  // const [isChecked, setChecked] = useState(false);
  const [openHealthInput, setOpenHealthInput] = useState(false);
  const t = useTranslation();


  const handleCancel = () => {
    onChangeHealthInput("");
    setOpenHealthInput(!openHealthInput);
  };

  const handleSave = () => {
    onChangeHealthInput(healthInput);
    setOpenHealthInput(!openHealthInput);
  };
  return (
    <View
      style={{
        width: width * 0.95,
        // backgroundColor: "pink",
        flexDirection: "row",
        alignSelf: "center",
        paddingTop: 15,
        // paddingBottom: 5,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "40%",
          backgroundColor: "#E38326",
          alignSelf: "center",
          alignItems: "center",
          padding: 2,
          borderRadius: 8,
        }}
      >
        {/* <TouchableOpacity onPress={() => setChecked({isChecked}) }> */}
        <View style={{ flexDirection: "column" }}>
          <View>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: COLORS.WHITE,
              }}
            >
              {t("សុខភាពកូន")}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: COLORS.WHITE,
              }}
            >
              ធម្មតា/Normal
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#FFDD7E" : undefined}
            />
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openHealthInput}
        onRequestClose={() => {
          setOpenHealthInput(!openHealthInput);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setOpenHealthInput(!openHealthInput)}
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
                  {t("សូមបញ្ចូលព័ត៌មានសុខភាពកូន")}
                </Text>
              </View>

              <TextInput
                // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable
                multiline
                numberOfLines={4}
                onChangeText={(text) => onChangeHealthInput(text)}
                value={healthInput}
                style={{
                  width: width * 0.75,
                  height: height * 0.08,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderBottomWidth: 1,
                  borderColor: COLORS.SUB,
                  borderRadius: 8,
                  
                }}
                placeholder={t("សូមបញ្ចូលនៅទីនេះ")}
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
                        { t("រក្សាទុក")}
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
        onPress={() => setOpenHealthInput(!openHealthInput)}
        style={{
          width: "57%",
          backgroundColor: "#E38326",
          alignSelf: "center",
          alignItems: "center",
          padding: 2,
          borderRadius: 8,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <View>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: COLORS.WHITE,
              }}
            >
              {t("សូមបញ្ចូលព័ត៌មាន")}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Kantumruy-Regular",
                fontSize: 14,
                color: COLORS.WHITE,
              }}
            >
              {t("សុខភាពកូននៅទីនេះ")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    marginLeft: 8,
    borderColor: COLORS.WHITE,
    // backgroundColor: "red",
    
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
