import { gql } from "@apollo/client";

export const GET_STU_TRAN_ATT = gql`
  query GetStudentTransportationAttendancePagination(
    $page: Int!
    $start: String!
    $end: String!
    $limit: Int!
    $studentId: String
    $busId: String
  ) {
    getStudentTransportationAttendancePagination(
      page: $page
      start: $start
      end: $end
      limit: $limit
      studentId: $studentId
      busId: $busId
    ) {
      data {
        _id
        date
        checkIn
        checkOut
        createdAt
      }
    }
  }
`;
