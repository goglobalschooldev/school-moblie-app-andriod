import React, { useContext } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS } from "./color";
import { StyleController } from "./static/styleProvider";

export default function RootLog({ children, Header, Arrow }) {
  const { styleState } = useContext(StyleController);

  return (
    <View
      style={{
        backgroundColor: COLORS.WHITE,
        minHeight: styleState.fullScreen,
        height:"100%"
      }}
    >
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        {Header}
        {Arrow}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={{
              // paddingLeft: styleState.rootPad,
              // paddingTop: 10,
              paddingRight: styleState.rootPad,
              // marginBottom: Platform.OS === "ios" ? 0 : 0,
              height: "100%",
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
}
