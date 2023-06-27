import React, { useEffect, useState, useRef, useMemo } from "react";
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
import * as Device from "expo-device";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
  setDefaultTranslations,
} from "react-multi-lang";
import en from "../translations/en.json";
import kh from "../translations/kh.json";
import { useNavigation } from "@react-navigation/native";

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
  const URI = "sms-endpoint.go-globalschool.com/graphql";
  // const URI = "192.168.2.10:2000/graphql";
  const [token, setToken] = useState("");
  const navigation = useNavigation();

  //noti
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const setLocalStorage = async (value) => {
    // console.log(value, "value");
    if (value) {
      await AsyncStorage.setItem("@tokenNoti", value);
    }
    setDefaultLanguage("kh");
    setTranslations({ kh, en });
    setDefaultTranslations({ kh, en });
  };

  //noti
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      // console.log(token, "tokenForPush");
      if (token) {
        setLocalStorage(token);
        setExpoPushToken(token);
        setDefaultLanguage("kh");
        setTranslations({ kh, en });
        setDefaultTranslations({ kh, en });
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content, "response");
        notificationNavigationHandler(response.notification.request.content);
        announcementNavigationHandler(response.notification.request.content);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const notificationNavigationHandler = ({ data }) => {
    // console.log("A notification has been touched", data);
    navigation.navigate("NotificationList", {
      studentId: data?.attId,
    });
  };

  const announcementNavigationHandler = ({ data }) => {
    // console.log("A notification has been touched", data);
    navigation.navigate("AnnouncementDetail", {
      announcementId: data?.attId,
    });
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          experienceId: "@goglobalschool/school-mobile",
        })
      ).data;
      // console.log(token, "token");
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

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
        AsyncStorage.removeItem("@tokenNoti");
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
