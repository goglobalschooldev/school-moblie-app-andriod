import { gql } from "@apollo/client";

export const STU_CARD_BY_STU_ID = gql`
  query GetStudentCardByStudentID($studentId: ID) {
    getStudentCardByStudentID(studentID: $studentId) {
      _id
    }
  }
`;
