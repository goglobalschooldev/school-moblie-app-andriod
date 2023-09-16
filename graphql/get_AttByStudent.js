import { gql } from "@apollo/client";

export const ATT_BY_STUDENT = gql`
  query GetAttendantsByClassForMobile(
    $classId: String!
    $studentId: String!
    $from: String!
    $to: String!
    $limit: Int!
  ) {
    getAttendantsByClassForMobile(
      classId: $classId
      studentId: $studentId
      from: $from
      to: $to
      limit: $limit
    ) {
      date
      check_in
      check_out
      attendance
    }
  }
`;
