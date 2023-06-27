import React, { useState, useContext, useMemo, useRef, createRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import ImageZoom from "react-native-image-pan-zoom";
import { Animated } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { StyleController } from "../../static/styleProvider";

export default function PreviewCover() {
  const { styleState, height, width } = useContext(StyleController);
  const [modalVisible, setModalVisible] = useState(false);
  const [panEnabled, setPanEnabled] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  //
  const pinchRef = createRef();
  const panRef = createRef();

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
                    source={require("../../assets/Images/new_event.jpg")}
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
        <Image
          source={require("../../assets/Images/new_event.jpg")}
          style={styles.bgProfileSub}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bgModal: {
    flex: 1,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    opacity: 0.9,
    position: "absolute",
  },
  bgProfileSub: {
    height: "85%",
    width: "94%",
    borderRadius: 15,
    alignSelf: "center",
  },
});
