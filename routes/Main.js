import React from "react";
import { actionTypes } from "../context/Reducer";
import { useStateValue } from "../context/StateProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigator from "../navigator";

const Main = () => {
  const [{ login }, dispatch] = useStateValue();
  const getLocalStorage = async () => {
    // login
    let login = await AsyncStorage.getItem("@login");
    dispatch({
      type: actionTypes.LOGIN,
      login: login,
    });

    let token = await AsyncStorage.getItem("@token");
    dispatch({
      type: actionTypes.TOKEN,
      token: token,
    });
    let accessToken = await AsyncStorage.getItem("@login");
    let newAccessToken = accessToken === null ? "" : JSON.parse(accessToken);
    dispatch({
      type: actionTypes.NEWTOKEN,
      newToken: newAccessToken,
    });
  };

  React.useEffect(() => {
    getLocalStorage();
  }, []);

  return <Navigator />;
};
export default Main;
