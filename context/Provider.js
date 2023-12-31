import React, { createContext, useEffect, useReducer, useState } from "react";
import { ACTION, reducer } from "./Reducer";
export const DataController = createContext();

export default function Provider({ children }) {
  const [logined, loginedDispatch] = useReducer(reducer, false);
  const [user, userDispatch] = useReducer(reducer, {});
  const [userTokenDBCtx, userTokenDBCtxDispatch] = useReducer(reducer, {});
  const [accountDBCtx, accountDBCtxDispatch] = useReducer(reducer, []);
  const [studentsDBCtx, studentsDBCtxDispatch] = useReducer(reducer, []);
  const [sectionDBCtx, sectionDBCtxDispatch] = useReducer(reducer, []);
  const [attendanceDBCtx, attendanceDBCtxDispatch] = useReducer(reducer, []);
  const [mobileDBCtx, mobileDBCtxDispatch] = useReducer(reducer, null);
  const [eventsDBCtx, eventsDBCtxDispatch] = useReducer(reducer, []);
  const [invoiceDBCtx, invoiceDBCtxDispatch] = useReducer(reducer, []);
  const [tokenNotiDBCtx, tokenNotiDBCtxDispatch] = useReducer(reducer, null);
  const [langDBCtx, langDBCtxDispatch] = useReducer(reducer, "");
  const [studentDBCtx, studentDBCtxDispatch] = useReducer(reducer, []);
  const [enrollmentDBCtx, enrollmentDBCtxDispatch] = useReducer(reducer, []);
  const [listLeaveDBCtx, listLeaveDBCtxDispatch] = useReducer(reducer, []);

  return (
    <DataController.Provider
      value={{
        user,
        userDispatch,
        logined,
        loginedDispatch,
        userTokenDBCtx,
        userTokenDBCtxDispatch,
        accountDBCtx,
        accountDBCtxDispatch,
        studentsDBCtx,
        studentsDBCtxDispatch,
        sectionDBCtx,
        sectionDBCtxDispatch,
        attendanceDBCtx,
        attendanceDBCtxDispatch,
        mobileDBCtx,
        mobileDBCtxDispatch,
        eventsDBCtx,
        eventsDBCtxDispatch,
        invoiceDBCtx,
        invoiceDBCtxDispatch,
        tokenNotiDBCtx,
        tokenNotiDBCtxDispatch,
        langDBCtx,
        langDBCtxDispatch,
        studentDBCtx,
        studentDBCtxDispatch,
        enrollmentDBCtx,
        enrollmentDBCtxDispatch,
        listLeaveDBCtx,
        listLeaveDBCtxDispatch,
      }}
    >
      {children}
    </DataController.Provider>
  );
}
