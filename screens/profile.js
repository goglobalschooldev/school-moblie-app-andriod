import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useContext, useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Root from "../root";
import Header from "../routes/header/Header";
import { COLORS } from "../color";
import { StyleController } from "../static/styleProvider";
import ModalSignOut from "../components/modal/modalSignOut";
import { DataController } from "../context/Provider";
import { Ionicons } from "@expo/vector-icons";
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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Profile({ navigation }) {
  const { styleState, height, width } = useContext(StyleController);
  const { accountDBCtx, accountDBCtxDispatch, mobileDBCtxDispatch } =
    useContext(DataController);
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const t = useTranslation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //user from mutaion login
  let Account = accountDBCtx?.user?.parentId;

  const ParentName = () => {
    if (getLanguage() === "kh") {
      return (
        <Text style={{ fontSize: 20 }}>
          {Account?.lastName + " " + Account?.firstName}
        </Text>
      );
    } else {
      return (
        <Text style={{ fontSize: 18 }}>
          {Account?.englishName !== null
            ? Account?.englishName
            : Account?.lastName + " " + Account?.firstName}
        </Text>
      );
    }
  };

  //

  //get Image from guery by mutation login Id
  let ProfileImage = accountDBCtx?.user;

  const {
    data: imageUser,
    loading: isLoading,
    refetch: mobileRefetch,
  } = useQuery(MOBILE_USER, {
    variables: {
      mobileUserId: ProfileImage?._id,
    },
    onCompleted: ({ getMobileUserById }) => {
      // console.log(getMobileUserById, "test");
    },
    onError: (error) => {
      console.log(error.message, "Error");
    },
    fetchPolicy: "network-only",
  });

  // console.log(imageUser?.getMobileUserById?.profileImage, "profile")

  //
  const [UpdateMobileUserProfileImg, { loading }] = useMutation(UPDATE_IMAGE, {
    onError: (e) => {
      console.log(e.message);
    },
  });

  const userImage =
    "https://storage.go-globalschool.com/api" +
    imageUser?.getMobileUserById?.profileImage;

  const userImgNull = imageUser?.getMobileUserById?.profileImage;

  // console.log(userImage)

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
          name: imageUser?.getMobileUserById?._id + ".png",
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
              mobileUserId: ProfileImage?._id,
              profileImage: uploadImg?.data,
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

  if (loading || isLoading || refreshing) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  }
  return (
    <Root Header={<HeaderSetting title={t("គណនី")} navigation={navigation} />}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="white"
          />
        }
      >
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
                  loadingImage={isLoading}
                  userImgNull={userImgNull}
                />
                <TouchableOpacity style={styles.camera} onPress={pickImage}>
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
                  {Account?.tel}
                </Text>
              </View>

              <View style={styles.List}>
                <MaterialIcons
                  style={{ width: 22 }}
                  name="email"
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
                  {accountDBCtx?.user?.email}
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
                    Account?.village +
                    " សង្កាត់" +
                    Account?.commune +
                    " ស្រុក" +
                    Account?.district +
                    " ខេត្ត" +
                    Account?.province}
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
