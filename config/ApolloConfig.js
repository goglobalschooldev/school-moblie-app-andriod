import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import LoginScreen from "../screens/loginScreen";
import * as Notifications from "expo-notifications";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
  setDefaultTranslations,
} from "react-multi-lang";
import en from "../translations/en.json";
import kh from "../translations/kh.json";
import { useNavigation } from "@react-navigation/native";
import { PermissionsAndroid } from "react-native";
import { DataController } from "../context/Provider";
import { ACTION } from "../context/Reducer";

setTranslations({ kh, en });
setDefaultTranslations({ kh, en });
setDefaultLanguage("kh");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const ApolloConfig = ({ children }) => {
  //endpoint1
  const URI = "sms-endpoint.go-globalschool.com/graphql";
  // const URI = "192.168.2.30:4300/graphql";
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  //noti
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isOpenedByNotification, setOpenedByNotification] = useState(true);
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const [appStatus, setAppStatus] = useState();

  // const setLocalStorage = async (value) => {
  //   // console.log(value, "value");
  //   if (value) {
  //     await AsyncStorage.setItem("@tokenNoti", value);
  //   }
  //   setDefaultLanguage("kh");
  //   setTranslations({ kh, en });
  //   setDefaultTranslations({ kh, en });
  // };

  // console.log(
  //   lastNotificationResponse?.notification?.request?.content?.data,
  //   "lastNotificationResponse"
  // );

  // React.useEffect(() => {
  //   if (
  //     lastNotificationResponse &&
  //     lastNotificationResponse.notification.request.content.data[
  //       "someDataToCheck"
  //     ] &&
  //     lastNotificationResponse.actionIdentifier ===
  //       Notifications.DEFAULT_ACTION_IDENTIFIER
  //   ) {
  //     // navigate to your desired screen
  //   }
  // }, [lastNotificationResponse]);

  const getLocalStorage = async () => {
    let appState = await AsyncStorage.getItem("@appState");
    setAppStatus(appState);
    return appState;
  };

  useEffect(() => {
    let interV = setInterval(() => {
      getLocalStorage();
    }, 2000);

    return () => {
      clearInterval(interV);
    };
  }, []);

  // console.log(appStatus, "appStatus");

  //noti
  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) => {
    //   // console.log(token, "tokenForPush");
    //   if (token) {
    //     setLocalStorage(token);
    //     setExpoPushToken(token);
    //     setDefaultLanguage("kh");
    //     setTranslations({ kh, en });
    //     setDefaultTranslations({ kh, en });
    //   }
    // });

    // registerForPushNotificationsAsync();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        setOpenedByNotification(notification.wasOpenedByUser);
        // console.log(notification, "notification");
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content.data, "response");
        notificationNavigationHandler(response.notification.request.content);
        // if (appStatus === true) {
        //   notificationNavigationHandler(response.notification.request.content);
        // }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const notificationNavigationHandler = ({ data }) => {
    console.log("A notification has been touched", data);
    if (data?.action === "approveLeave") {
      navigation.navigate(
        "NotificationScreen"
        //  , {
        //         studentId: data?.stu_id,
        //       }
      );
    }
  };

  // const announcementNavigationHandler = ({ data }) => {
  //   // console.log("A notification has been touched", data);
  //   navigation.navigate("AnnouncementDetail", {
  //     announcementId: data?.attId,
  //   });
  // };

  useEffect(() => {
    async function fetchData() {
      const userToken = await AsyncStorage.getItem("@login");
      const newToken = JSON.parse(userToken);
      // console.log(newToken, "newToken");
      setToken(newToken?.token);
      setDefaultLanguage("kh");
      setTranslations({ kh, en });
      setDefaultTranslations({ kh, en });
    }
    fetchData();
  }, [setToken]);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem("@login");
    const newToken = JSON.parse(userToken);
    // console.log(newToken?.token, "newToken?.token");
    setToken(newToken?.token);
    setDefaultLanguage("kh");
    setTranslations({ kh, en });
    setDefaultTranslations({ kh, en });
    return newToken?.token;
  };

  const logoutLink = onError((networkError) => {
    try {
      if (
        networkError?.response?.errors[0]?.message === "jwt expired" ||
        networkError?.response?.errors[0]?.message === "Error"
      ) {
        console.log(networkError?.response?.errors[0]?.message);
        // AsyncStorage.clear();
        // AsyncStorage.removeItem("@tokenNoti");
        AsyncStorage.removeItem("@login");
        setToken("");
      }
    } catch (e) {
      // remove error
    }
  });

  //If use live endpoint uri use "https and wss" , if use local endpoint uri use "http and ws"
  const uploadLink = createHttpLink({
    uri: `https://${URI}`,
  });

  const wsLink = new WebSocketLink({
    uri: `wss://${URI}`,
    options: {
      reconnect: true,
    },
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : getToken(),
      },
    };
  });

  //
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition?.kind === "OperationDefinition" &&
        definition?.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(uploadLink)
  );

  const client = new ApolloClient({
    link: new ApolloLink.from([logoutLink, splitLink]),
    // link: new ApolloLink.from([splitLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getStudenAttendancePermissionById: {
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });

  if (token === "" || token === undefined || token === null) {
    return (
      <ApolloProvider client={client}>
        <LoginScreen token={expoPushToken} />
      </ApolloProvider>
    );
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloConfig;
