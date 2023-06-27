import { gql } from "@apollo/client";

export const STU_QRCODE = gql`
  query GetStudentCardByStudentID($studentId: ID) {
    getStudentCardByStudentID(studentID: $studentId) {
      _id
      status
    }
  }
`;
