import { gql } from "@apollo/client";

export const GET_SCHOOL_BUS_ATT = gql`
  query GetSchoolBusAttById($stuId: ID, $limit: Int) {
    getSchoolBusAttById(stuId: $stuId, limit: $limit) {
      studentId
      attendanceDate
      pickUpAt
      sendOffAt
    }
  }
`;
