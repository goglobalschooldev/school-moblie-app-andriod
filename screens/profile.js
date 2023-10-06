import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Root from "../root";
import Header from "../routes/header/Header";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import ModalSignOut from "../components/modal/modalSignOut";
import { DataController } from "../context/Provider";
import { MOBILE_USER } from "../graphql/gql_MobileUser";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_IMAGE } from "../graphql/gql_updateImage";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import PreviewImage from "../components/modal/previewImage";
import { ACTION } from "../context/Reducer";
import PreviewCover from "../components/profile/previewCover";
import LanguageModal from "../components/modal/languageModal";
import { getLanguage, useTranslation } from "react-multi-lang";
import { ScrollView } from "react-native";
import HeaderSetting from "../routes/header/HeaderSetting";
import { GER_USERINFO, Get_USERINFO } from "../graphql/Get_MobileUserLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GER_PARENTSBYID } from "../graphql/Get_ParentsById";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Profile({ navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, mobileDBCtxDispatch, loginedDispatch } =
    useContext(DataController);
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const t = useTranslation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const ParentName = () => {
    if (getLanguage() === "kh") {
      return (
        <Text style={{ fontSize: 20 }}>
          {useinfo?.lastName + " " + useinfo?.firstName}
        </Text>
      );
    } else {
      return (
        <Text style={{ fontSize: 18 }}>
          {useinfo?.englishName !== null
            ? useinfo?.englishName
            : useinfo?.lastName + " " + useinfo?.firstName}
        </Text>
      );
    }
  };

  let ProfileImage = accountDBCtx;

  //useInfo
  const [useinfo, setUserinfo] = useState(null);
  const {
    data: UserData,
    loading: UserLoading,
    error: UserError,
    refetch: UserRefetch,
  } = useQuery(GER_USERINFO, {
    pollInterval: 2000,
    onCompleted: ({ getMobileUserLogin }) => {
      setUserinfo(getMobileUserLogin);
      console.log(useinfo, "useinfo");
    },
    onError: async (error) => {
      console.log(error.message, "Error getUser");
      if (error.message === "Not Authorized") {
        await AsyncStorage.removeItem("@userData");
        loginedDispatch({
          type: ACTION.LOGIN_USER,
          payload: false,
        });
      }
    },
  });

  // GETPATENT
  const [parentinfo, setParentinfo] = useState(null);
  const {
    data: ParentData,
    loading: ParentLoading,
    error: ParentError,
    refetch: ParentRefetch,
  } = useQuery(GER_PARENTSBYID, {
    variables: {
      id: ProfileImage?.uid,
    },
    pollInterval: 2000,
    onCompleted: ({ getParentsById }) => {
      setParentinfo(getParentsById);
      console.log(parentinfo, "parentinfo");
    },
    onError: async (error) => {
      console.log(error.message, "Error parentinfo");
      // if (error.message === "Not Authorized") {
      //   await AsyncStorage.removeItem("@userData");
      //   loginedDispatch({
      //     type: ACTION.LOGIN_USER,
      //     payload: false,
      //   });
      // }
    },
  });

  useEffect(() => {
    UserRefetch();
  }, [useinfo]);

  useEffect(() => {
    ParentRefetch();
  }, [parentinfo]);

  const [UpdateMobileUserProfileImg, { loading }] = useMutation(UPDATE_IMAGE, {
    onError: (e) => {
      console.log(e.message);
    },
  });

  const userImage =
    "https://storage.go-globalschool.com/api" + useinfo?.profileImg;

  //handle update image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let imgUser = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!imgUser.canceled) {
      setImage(imgUser.uri);

      try {
        // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = imgUser.uri;
        let filename = localUri.split("/").pop();

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        formData.append("image", {
          uri: imgUser.uri,
          name: useinfo?._id + ".png",
          type: "image/png", // if you can get image type from cropping replace here
        });

        let uploadImg = await axios({
          baseURL: "https://storage.go-globalschool.com/",
          headers: {
            "Content-Type": "multipart/form-data", // this is important
          },
          method: "post",
          url: "api/school/upload",
          data: formData,
        });

        if (uploadImg) {
          await UpdateMobileUserProfileImg({
            variables: {
              id: ProfileImage?.uid,
              profileImg: uploadImg?.data,
            },
            update(_, result) {
              mobileRefetch();
              mobileDBCtxDispatch({
                type: ACTION.MOBILE_USER,
                payload: uploadImg?.data,
              });
            },
          });
        }
        // console.log(uploadImg, "uploadImg")
        return uploadImg;
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (loading || refreshing) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  return (
    <Root Header={<Header title={t("គណនី")} navigation={navigation} />}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* cover */}
            <PreviewCover />
            <View style={styles.bgProfile}>
              <View
                style={{
                  width: width * 0.3,
                  height: height * 0.16,
                  justifyContent: "flex-end",
                }}
              >
                <PreviewImage
                  navigation={navigation}
                  images={image}
                  userImages={userImage}
                  loadingImage={UserLoading}
                  userImgNull={useinfo?.profileImg}
                />
                <TouchableOpacity
                  style={styles.camera}
                  onPress={() => {
                    pickImage();
                  }}
                >
                  <FontAwesome name="camera" size={16} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.conTitle}>
                {/* <Text style={{ fontSize: 20 }}>
                    {Account?.lastName + " " + Account?.firstName}
                  </Text> */}
                {ParentName()}
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.body}>
            <View style={styles.conEdit} />
            <View>
              <View style={styles.btn}>
                <Text
                  style={{
                    color: COLORS.MAIN,
                    fontFamily: "Kantumruy-Regular",
                    fontSize: 14,
                  }}
                >
                  {t("ព័ត៌មានផ្ទាល់ខ្លួន")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.footer}>
            <View style={styles.containList}>
              <View style={styles.List}>
                <Ionicons
                  name="call"
                  style={{ width: 22 }}
                  size={18}
                  color="#A0A0A0"
                />
                <Text
                  style={{
                    padding: 3,
                    fontSize: 14,
                    fontFamily: "Kantumruy-Regular",
                  }}
                >
                  {parentinfo?.tel}
                </Text>
              </View>

              <View style={styles.List}>
                <Ionicons
                  style={{ width: 22 }}
                  name="person"
                  size={20}
                  color="#A0A0A0"
                />
                <Text
                  style={{
                    padding: 3,
                    fontSize: 14,
                    fontFamily: "Kantumruy-Regular",
                  }}
                >
                  {parentinfo?.nationality}
                </Text>
              </View>
              <View style={styles.List}>
                <MaterialCommunityIcons
                  name="home-city"
                  style={{ width: 22 }}
                  size={18}
                  color="#A0A0A0"
                />
                <Text
                  style={{
                    padding: 3,
                    fontSize: 13,
                    fontFamily: "Kantumruy-Regular",
                  }}
                >
                  {"ភូមិ" +
                    parentinfo?.village +
                    " សង្កាត់" +
                    parentinfo?.commune +
                    " ស្រុក" +
                    parentinfo?.district +
                    " ខេត្ត" +
                    parentinfo?.province}
                </Text>
              </View>
            </View>
            <View style={styles.conBtn}>
              <ModalSignOut />
            </View>
            {/* <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  alignSelf: "flex-end",
                }}
              >
                <LanguageModal />
              </View> */}
          </View>
        </View>
      </ScrollView>
    </Root>
  );
}

const H = Dimensions.get("screen").height;
const W = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    width: "95%",
    alignSelf: "center",
  },
  header: {
    height: H / 3,
    width: W,
    position: "relative",
  },
  bgProfile: {
    height: "95%",
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
  },

  conTitle: {
    alignItems: "center",
    height: "15%",
    top: 5,
  },
  camera: {
    position: "absolute",
    bottom: 10,
    right: 0,
    backgroundColor: COLORS.BLUE_LIGHT,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  body: {
    height: H / 12,
    width: W,
    justifyContent: "center",
    alignItems: "center",
  },
  conEdit: {
    backgroundColor: "#CCCC",
    alignItems: "center",
    justifyContent: "center",
    width: W,
    height: 1,
  },
  btn: {
    backgroundColor: COLORS.BLUE_LIGHT,
    borderRadius: 5,
    position: "absolute",
    width: 170,
    padding: 5,
    left: -75,
    top: -18,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: H / 3,
    width: W,
    // backgroundColor: "blue",
  },
  containList: {
    height: "50%",
    paddingHorizontal: 15,
  },
  conBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  List: {
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
