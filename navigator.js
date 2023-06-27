import React, { useContext, useState } from "react";
import { DataController } from "./context/Provider";
import HomeStack from "./routes/homeStack";
import LoginStack from "./routes/loginStack";

const Navigator = () => {
  const { logined } = useContext(DataController);
  return logined ? <HomeStack /> : <LoginStack />;
};

export default Navigator;
