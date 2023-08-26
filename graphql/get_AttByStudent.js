import { gql } from "@apollo/client";

export const ATT_BY_STUDENT = gql`
  query GetAttendantsByStudent(
    $studentId: String!
    $from: String
    $to: String
    $limit: Int
    $classId: ID
  ) {
    getAttendantsByStudent(
      student_id: $studentId
      from: $from
      to: $to
      limit: $limit
      classId: $classId
    ) {
      _id
      date
      classroom
      firstName
      lastName
      englishName
      check_in
      check_out
      status
    }
  }
`;
