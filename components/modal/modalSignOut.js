import React, { useState, useContext, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleController } from "../../static/styleProvider";
import { DataController } from "../../context/Provider";
import { ACTION } from "../../context/Reducer";
import { GoButton } from "../../static/btn-com";
import { MOBILE_USER_LOGOUT } from "../../graphql/gql_mobileUserLogOut";
import { useMutation } from "@apollo/client/react";
import { COLORS } from "../../color";
import { useTranslation } from "react-multi-lang";

export default function ModalSignOut() {
  const { userDispatch, loginedDispatch, accountDBCtx } =
    useContext(DataController);
  const { styleState, height, width } = useContext(StyleController);
  const [openModalSignOut, setOpenModalSignOut] = useState(false);
  const [notiToken, setNotiToken] = useState("");
  const t = useTranslation();

  //
  const getLocalStorage = async () => {
    let tokenNoti = await AsyncStorage.getItem("@tokenNoti");
    setNotiToken(tokenNoti);
    return tokenNoti;
  };

  useEffect(() => {
    let interV = setInterval(() => {
      getLocalStorage();
    }, 2000);

    return () => {
      clearInterval(interV);
    };
  }, []);

  const [mobileUserLogOut] = useMutation(MOBILE_USER_LOGOUT, {
    onCompleted: ({ mobileUserLogOut }) => {
      console.log(mobileUserLogOut, "test mobileUserLogOut");
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
  async function clearUserData() {
    // await AsyncStorage.removeItem("@tokenNoti");
    await AsyncStorage.removeItem("@login");
    try {
      loginedDispatch({
        type: ACTION.LOGIN_USER,
        payload: false,
      });
      userDispatch({
        type: ACTION.LOGOUT_USER,
      });
      return true;
    } catch (e) {
      // remove error
    }
  }

  const signOutFn = async () => {
    mobileUserLogOut({
      variables: {
        mobileUserId: accountDBCtx?.user?._id,
        token: notiToken,
      },
      update(_, result) {
        if (result?.data?.mobileUserLogOut?.success === true) {
          clearUserData();
        }
      },
    });
  };

  return (
    <View style={{ width: "100%" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModalSignOut}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setOpenModalSignOut(!openModalSignOut);
        }}
      >
        <View style={styles.bgModal} />
        <TouchableWithoutFeedback
          onPress={() => setOpenModalSignOut(!openModalSignOut)}
        >
          <View style={styles.centerModal}>
            <View style={styles.modalBox}>
              <View
                style={{
                  width: width * 0.8,
                  height: height * 0.07,
                  // backgroundColor: "#3C3C3C",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Bayon-Regular",
                    fontSize: 16,
                    alignSelf: "center",
                    // color: COLORS.WHITE,
                    color: "#3C3C3C",
                  }}
                >
                  {t("ចាកចេញ")}
                </Text>
              </View>
              <View style={styles.titleLanguage}>
                <Text style={styles.textKh}>តើអ្នកចង់ចាកចេញពីកម្មវិធីទេ?</Text>
                <Text style={styles.textEng}>Do you want to Logout?</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 15,
                }}
              >
                <GoButton
                  style={{
                    backgroundColor: "#E8E8E8",
                    width: "42%",
                    borderRadius: 5,
                    height: 40,
                    right: 20,
                  }}
                  color="black"
                  title={t("មិនចាកចេញ")}
                  size={14}
                  align="center"
                  font={styleState.kanRegular}
                  bottom={2}
                  onPress={() => setOpenModalSignOut(!openModalSignOut)}
                />

                <GoButton
                  style={{
                    backgroundColor: "#FB3C3C",
                    width: "40%",
                    borderRadius: 5,
                    height: 40,
                    left: 20,
                  }}
                  color="white"
                  title={t("ចាកចេញ")}
                  size={14}
                  align="center"
                  font={styleState.kanRegular}
                  bottom={2}
                  onPress={() => signOutFn()}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        style={styles.btnLogout}
        onPress={() => setOpenModalSignOut(!openModalSignOut)}
      >
        <Text
          style={{ color: "white", fontFamily: "Bayon-Regular", fontSize: 18 }}
        >
          {t("ចាកចេញ")}
        </Text>
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
    height: "25%",
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
  titleLanguage: {
    width: "100%",
    // height: "45%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "column",
    // backgroundColor: 'pink'
  },
  textEng: {
    color: "black",
    fontSize: 15,
    fontFamily: "Kantumruy-Regular",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textKh: {
    color: "black",
    fontSize: 14,
    fontFamily: "Kantumruy-Regular",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  btnLogout: {
    backgroundColor: "#FB3C3C",
    width: "95%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 15,
  },
});
