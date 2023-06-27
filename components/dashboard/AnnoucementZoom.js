import React, { useState, useContext, useMemo, useRef, createRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import ImageZoom from "react-native-image-pan-zoom";
import AutoHeightImage from "react-native-auto-height-image";
import { StyleController } from "../../static/styleProvider";
import { Animated } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";

export default function AnnoucementZoom({
  load,
  loading,
  dataNoti,
  announcementtLoading,
}) {
  const { styleState, height, width } = useContext(StyleController);
  const [modalVisible, setModalVisible] = useState(false);
  //   console.log(load?.data?.picture,"load")
  const [panEnabled, setPanEnabled] = useState(false);

  //
  const ImageData = useMemo(() => {
    return (
      <AutoHeightImage
        source={{
          uri:
            load?.data?.picture ||
            dataNoti?.getAnnouncementById?.picture + "?time=" + new Date(),
          cache: "reload",
        }}
        resizeMode="contain"
        width={width * 0.98}
        style={{ alignSelf: "center", margin: 5 }}
      />
    );
  }, [load?.data?.picture, dataNoti?.getAnnouncementById?.picture]);

  //declare some useful variables
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  //
  const pinchRef = createRef();
  const panRef = createRef();

  //declare both Pan & Pinch events
  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }
  };

  if (loading || announcementtLoading) {
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
          {/* image */}
          <View>
            <PanGestureHandler
              onGestureEvent={onPanEvent}
              ref={panRef}
              simultaneousHandlers={[pinchRef]}
              enabled={panEnabled}
              failOffsetX={[-1000, 1000]}
              shouldCancelWhenOutside
            >
              <Animated.View>
                <PinchGestureHandler
                  ref={pinchRef}
                  onGestureEvent={onPinchEvent}
                  simultaneousHandlers={[panRef]}
                  onHandlerStateChange={handlePinchStateChange}
                >
                  <ImageZoom
                    cropWidth={width}
                    cropHeight={height}
                    imageWidth={width}
                    imageHeight={height}
                    panToMove={true}
                    pinchToZoom={true}
                    useHardwareTextureAndroid={true}
                    enableCenterFocus={true}
                    minScale={0.8}
                  >
                    <Animated.Image
                      source={{
                        uri:
                          load?.data?.picture ||
                          dataNoti?.getAnnouncementById?.picture +
                            "?time=" +
                            new Date(),
                        cache: "reload",
                      }}
                      style={{
                        width: "98%",
                        height: "80%",
                        transform: [{ scale }, { translateX }, { translateY }],
                        alignSelf: "center",
                      }}
                      resizeMode="contain"
                    />
                  </ImageZoom>
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          {ImageData}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgModal: {
    flex: 1,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    // opacity: 0.5,
    position: "absolute",
  },
  loadingStyle: {
    flex: 1,
    justifyContent: "center",
  },
});
