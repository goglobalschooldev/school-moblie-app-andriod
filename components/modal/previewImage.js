import React, { useState, useContext, useMemo } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StyleController } from "../../static/styleProvider";
import ImageZoom from "react-native-image-pan-zoom";
import AutoHeightImage from "react-native-auto-height-image";
import { COLORS } from "../../color";


export default function PreviewImage({ images, userImages, loadingImage,userImgNull }) {
  const { styleState, height, width } = useContext(StyleController);
  const [modalVisible, setModalVisible] = useState(false);

  // console.log(userImages, "userImages");
  
  const ImageData = useMemo(() => {
    return (
      <>
        {images && (
          <Image
            source={{ uri: images, cache: "reload" }}
            style={styles.image}
            resizeMode={"cover"}
          />
        )}

        {!images && (
          <Image
            source={
              userImages === "https://storage.go-globalschool.com/api" ||
              null || userImgNull === null
              // ||
              // "https://storage.go-globalschool.com/apinull"
                ? require("../../assets/Images/user.png")
                : { uri: userImages + "?time=" + new Date(), cache: "reload" }
            }
            style={styles.image}
            resizeMode={"cover"}

          />
        )}
      </>
    );
  }, [userImages + "?time=" + new Date()]);

  const ImagePreview = useMemo(() => {
    return (
      <AutoHeightImage
        source={
          userImages === "https://storage.go-globalschool.com/api" ||
          null 
          // || "https://storage.go-globalschool.com/apinull"
            ? require("../../assets/Images/defaultUser.png")
            : { uri: userImages + "?time=" + new Date(), cache: "reload" }
        }
        resizeMode="contain"
        width={width}
        style={{
          alignSelf: "center",
          flex: 1,
          justifyContent: "center",
        }}
      />
    );
  }, [userImages + "?time=" + new Date()]);

  if (loadingImage) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size="large" color="#EFB419" />
      </View>
    );
  } else {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.bgModal} />
          <View
            style={{
              flexDirection: "row-reverse",
              right: 5,
              padding: 5,
            }}
          >
            <Entypo
              name="circle-with-cross"
              size={26}
              color="white"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <ImageZoom
            cropWidth={width}
            cropHeight={Dimensions.get("window").height / 1.15}
            imageWidth={400}
            imageHeight={height}
            panToMove={true}
            pinchToZoom={true}
            useHardwareTextureAndroid={false}
          >
            {ImagePreview}
          </ImageZoom>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          {ImageData}
        </TouchableOpacity>
      </View>
    );
  }
}
const H = Dimensions.get("screen").height;
const W = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  bgModal: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.9,
    position: "absolute",
  },
  modalView: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    position: "absolute",
    // bottom: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: W / 3.3,
    width: W / 3.3,
    borderRadius: 150,
    alignSelf: "center",
  },
});
