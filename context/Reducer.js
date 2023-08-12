export const ACTION = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  QUERY_STUDENTS: "QUERY_STUDENTS",
  QUERY_EVENTS: "QUERY_EVENTS",
  QUERY_ANNOUNCEMENT: "QUERY_ANNOUNCEMENT",
  STU_SECTION: "STU_SECTION",
  STU_ATTENDANCE: "STU_ATTENDANCE",
  MOBILE_USER: "MOBILE_USER",
  INVOICE_BY_STUDENT: "INVOICE_BY_STUDENT",
  UPDATE_MOBILE_TOKEN: "UPDATE_MOBILE_TOKEN",
  EYS_REPORT: "EYS_REPORT",
  LANG: "LANG",
  QUERY_STUDENT: "QUERY_STUDENT",
  ENROLLMENT_STUDENTS: "ENROLLMENT_STUDENTS",
  LIST_LEAVE: "LIST_LEAVE",
  TEST_NOTI: "TEST_NOTI",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOGIN_USER:
      return action.payload;
    case ACTION.LOGOUT_USER:
      return {};
    case ACTION.QUERY_STUDENTS:
      return action.payload;
    case ACTION.QUERY_EVENTS:
      return action.payload;
    case ACTION.QUERY_ANNOUNCEMENT:
      return action.payload;
    case ACTION.STU_SECTION:
      return action.payload;
    case ACTION.STU_ATTENDANCE:
      return action.payload;
    case ACTION.MOBILE_USER:
      return action.payload;
    case ACTION.INVOICE_BY_STUDENT:
      return action.payload;
    case ACTION.UPDATE_MOBILE_TOKEN:
      return action.payload;
    case ACTION.EYS_REPORT:
      return action.payload;
    case ACTION.LANG:
      return action.payload;
    case ACTION.QUERY_STUDENT:
      return action.payload;
    case ACTION.ENROLLMENT_STUDENTS:
      return action.payload;
    case ACTION.LIST_LEAVE:
      return action.payload;
    case ACTION.TEST_NOTI:
      return action.payload;
    default:
      throw new Error();
  }
};
