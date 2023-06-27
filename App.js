import React, { useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StyleProvider from "./static/styleProvider";
import Provider from "./context/Provider";
import Navigator from "./navigator";
import ApolloConfig from "./config/ApolloConfig";
import VersionCheck from "react-native-version-check";
import { Alert } from "react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

export default function App() {
  // const version = Constants.manifest.version;
  // // console.log(version,"version");
  // const handleOpenPlay = () => {
  //   Linking.openURL(
  //     "https://play.google.com/store/apps/details?id=com.goglobalschool.schoolmobile&pli=1"
  //   );
  // };

  // useMemo(() => {
  //   if (version < "1.0.19") {
  //     Alert.alert(
  //       "Update App",
  //       "Please update new version to continue using app",
  //       [
  //         {
  //           text: "cancel",
  //           onPress: () => console.log('Cancel Pressed'),

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
      <Provider>
        <NavigationContainer>
          <ApolloConfig>
            <Navigator />
          </ApolloConfig>
        </NavigationContainer>
      </Provider>
    </StyleProvider>
  );
}
