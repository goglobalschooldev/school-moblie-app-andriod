import React, { useContext, useRef,useState } from "react";
import { TouchableOpacity, View, Text,Image } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../../color";
import { StyleController } from "../../static/styleProvider";
import ClassCard from "../ClassCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ClassSheet({navigation, data }) {
  const { styleState, height, width } = useContext(StyleController);
  const [selectData, setSelectData] = useState({});
  const refRBSheet = useRef(
    // setSelectData(data)
  );

//   const openModalStu = (e, data) => {
//     setModalVisible(e);
//     setSelectData(data);
//   };

  const ChildhoodReport = () => {
    if (selectData?.classGroupNameEn === "ECE") {
      return (
        <TouchableOpacity
          onPress={() => {
            // refRBSheet.current.close();
            navigation?.navigate("ChildReport", {
              invoiceData: selectData,
            });
          }}
        >
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <View style={{ justifyContent: "center" }}>
              <MaterialCommunityIcons
                name="calendar-check-outline"
                size={22}
                color="#3C6EFB"
              />
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Bayon-Regular",
                  fontSize: 16,
                  color: COLORS.MAIN,
                  left: 12,
                }}
              >
                របាយការណ៍កុមារដ្ឋាន
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <>
      {data?.map((load, index) => {
        return (
          <TouchableOpacity
            key={load?.enrollmentId}
            onPress={() => refRBSheet.current.open()}
          >
            <ClassCard
              {...load}
              bgColor={index % 2 == 0 ? COLORS.BLUE_LIGHT : COLORS.ORANGE_LIGHT}
              color={index % 2 == 0 ? COLORS.BLUE_DARK : COLORS.ORANGE_DARK}
            />
          </TouchableOpacity>
        );
      })}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(24,23,23,0.7374300061821604) 10%",
          },
          draggableIcon: {
            backgroundColor: "#a8a8aa",
          },
          container: {
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.9,
            shadowRadius: 10,
            elevation: 5,
            paddingBottom: 20,
          },
        }}
        animationType="fade"
        height={height * 0.7}
        
      >
        <View
          style={{
            flex: 1,
            width: width * 0.95,
            // height: height,
            // backgroundColor: "pink",
            alignSelf: "center",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              height: 40,
              width: "95%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily: "Kantumruy-Regular",
                  fontSize: 16,
                  color: COLORS.MAIN,
                }}
              >
                ជ្រើសរើស
              </Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: "center",
              // paddingTop: 20,
              top: 40,
              alignItems: "center",
            }}
          >
            <View
            style={{
              width: "90%",
              paddingTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
                navigation?.navigate("Schedule", { schedule: selectData });
              }}
            >
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../assets/Images/calendar-clock.png")}
                    style={{ width: 18, height: 18 }}
                  />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Bayon-Regular",
                      fontSize: 16,
                      color: COLORS.MAIN,
                      left: 12,
                    }}
                  >
                    កាលវិភាគសិក្សា
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation?.navigate("Attendance", {
                  attendanceData: selectData,
                });
              }}
            > */}
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../assets/Images/list-check.png")}
                    style={{ width: 18, height: 18 }}
                  />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Bayon-Regular",
                      fontSize: 16,
                      color: COLORS.MAIN,
                      left: 12,
                    }}
                  >
                    វត្តមានសិស្ស
                  </Text>
                </View>
              </View>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation?.navigate("AcedemicFees", {
                  invoiceData: selectData,
                });
              }}
            > */}
              <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                <View style={{ justifyContent: "center" }}>
                  <Image
                    source={require("../../assets/Images/calendar_dollar.png")}
                    style={{ width: 18, height: 18 }}
                  />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "Bayon-Regular",
                      fontSize: 16,
                      color: COLORS.MAIN,
                      left: 12,
                    }}
                  >
                    ប្រវត្តិបង់ថ្លៃសិក្សា
                  </Text>
                </View>
              </View>
            {/* </TouchableOpacity> */}
            {/* {ChildhoodReport()} */}
          </View>
          </View>
        </View>
      </RBSheet>
    </>
  );
}
