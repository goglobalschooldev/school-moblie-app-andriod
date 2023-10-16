import React, { useEffect, useState, useRef, useContext } from "react";
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
import * as Notifications from "expo-notifications";
import {
  setTranslations,
  setDefaultLanguage,
  setDefaultTranslations,
} from "react-multi-lang";
import en from "../translations/en.json";
import kh from "../translations/kh.json";
import { useNavigation } from "@react-navigation/native";
import { DataController } from "../context/Provider";

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
  const URI = "endpoint-visitor-school.go-globalit.com/graphql";
  // const URI = "192.168.2.30:4300/graphql";
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  //noti
  const notificationListener = useRef();
  const responseListener = useRef();
  const { accountDBCtx } = useContext(DataController);

  useEffect(() => {
    let interV = setInterval(() => {}, 2000);
    return () => {
      clearInterval(interV);
    };
  }, []);

  useEffect(() => {
    // registerForPushNotificationsAsync();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response.notification.request.content.data, "response");
        notificationNavigationHandler(response.notification.request.content);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const notificationNavigationHandler = ({ data }) => {
    if (data?.action === "approveLeave" || data?.action === "canceledLeave") {
      navigation.navigate("NotificationScreen");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const newToken = accountDBCtx;
      setToken(newToken?.token);
      setDefaultLanguage("kh");
      setTranslations({ kh, en });
      setDefaultTranslations({ kh, en });
    }
    fetchData();
  }, [accountDBCtx?.token]);

  const logoutLink = onError((networkError) => {
    try {
      if (
        networkError?.response?.errors[0]?.message === "jwt expired" ||
        networkError?.response?.errors[0]?.message === "Error" ||
        networkError?.graphQLErrors[0]?.message === "Not Authorized"
      ) {
        console.log(networkError?.response?.errors[0]?.message);
        // loginedDispatch({
        //   type: ACTION.LOGIN_USER,
        //   payload: false,
        // });
        // AsyncStorage.removeItem("@userData");
        // AsyncStorage.removeItem("@login");
        // setToken("");
      } else console.log(networkError?.graphQLErrors[0]?.message);
    } catch (e) {}
  });

  const uploadLink = createHttpLink({
    uri: `http://${URI}`,
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
        authorization: token,
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

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloConfig;
