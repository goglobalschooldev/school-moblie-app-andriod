import { gql } from "@apollo/client";

export const GET_STUDENT_TRANSPORTATION = gql`
  query GetStudentTransportationByMobileUser($id: String!) {
    getStudentTransportationByMobileUser(_id: $id) {
      _id
      student_id
      transportation
      profileImg
      englishName
      gender
      firstName
      lastName
    }
  }
`;
