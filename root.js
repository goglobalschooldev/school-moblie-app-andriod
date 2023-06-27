import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { StyleController } from "./static/styleProvider";

export default function Root({ children, Header, Arrow,OtherHeader }) {
  const { styleState } = useContext(StyleController);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        minHeight: styleState.fullScreen,
      }}
    >
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
      />
      <SafeAreaView>
        {Header}
        {Arrow}
        {OtherHeader}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <ScrollView>
            <View
              style={{
                minHeight: styleState.fullScreen,
                // marginBottom: Platform.OS === "ios" ? 300 : 250,
              }}
            >
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
