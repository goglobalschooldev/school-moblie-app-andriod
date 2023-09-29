import React, { useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StyleProvider from "./static/styleProvider";
import Provider from "./context/Provider";
import Navigator from "./navigator";
import ApolloConfig from "./config/ApolloConfig";
import { Alert, BackHandler, Linking } from "react-native";
import Constants from "expo-constants";
import VersionCheck from "react-native-version-check";
import * as Notifications from "expo-notifications";
import { Text } from "react-native";
import { NativeBaseProvider } from "native-base";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  // const version = Constants.manifest.version;
  // // console.log(version,"version");
  // const handleOpenPlay = () => {
  //   Linking.openURL(
  //     "https://play.google.com/store/apps/details?id=com.goglobalschool.schoolmobile&pli=1"
  //   );
  // };

  // useMemo(() => {
  //   if (version < "1.0.30") {
  //     Alert.alert(
  //       "Update App",
  //       "Please update new version to continue using app",
  //       [
  //         {
  //           text: "cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //         },
  //         {
  //           text: "Update Now",
  //           onPress: (e) => {
  //             handleOpenPlay(e);
  //           },
  //         },
  //       ]
  //     );
  //   }
  // }, []);

  return (
    <StyleProvider>
      <NativeBaseProvider>
        <ToastProvider>
          <Provider>
            <NavigationContainer>
              <ApolloConfig>
                <Navigator />
              </ApolloConfig>
            </NavigationContainer>
          </Provider>
        </ToastProvider>
      </NativeBaseProvider>
    </StyleProvider>
  );
}
