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
import { ExpandingDot } from "react-native-animated-pagination-dots";

import {
  PanGestureHandler,
  PinchGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import { FlatList } from "react-native";

export default function AnnoucementZoom({
  load,
  loading,
  announcementtLoading,
}) {
  const { styleState, height, width } = useContext(StyleController);
  const [modalVisible, setModalVisible] = useState(false);
  const [panEnabled, setPanEnabled] = useState(false);
  const [Image, setImage] = useState("");

  //declare some useful variables
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  //
  function ImageData({ item }) {
    return (
      <AutoHeightImage
        source={{
          uri: item + "?time=" + new Date(),
          cache: "reload",
        }}
        resizeMode="contain"
        width={width * 0.98}
        style={{ alignSelf: "center", margin: 5 }}
      />
    );
  }

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
                        uri: Image + "?time=" + new Date(),
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
        {/* <ScrollView horizontal showsVerticalScrollIndicator={false}>
          {load?.data?.referenceFiles?.map((item) => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible), setImage(item);
              }}
              style={{ flexDirection: "row" }}
              key={item}
            >
              <ImageData item={item} />
            </TouchableOpacity>
          ))}
        </ScrollView> */}
        <FlatList
          data={load?.data?.referenceFiles}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          pagingEnabled
          horizontal
          decelerationRate={"normal"}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            // Render each item here
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible), setImage(item);
              }}
              style={{ flexDirection: "row" }}
              key={item}
            >
              <ImageData item={item} />
            </TouchableOpacity>
          )}
        />
        <ExpandingDot
          data={load?.data?.referenceFiles}
          expandingDotWidth={30}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          dotStyle={{
            width: 10,
            height: 10,
            backgroundColor: "#347af0",
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          containerStyle={
            {
              // top: 30,
            }
          }
        />
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
