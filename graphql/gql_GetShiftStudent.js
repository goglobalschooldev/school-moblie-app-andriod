import { gql } from "@apollo/client";

export const STUDENT_SHIFT = gql`
  query GetShiftByStudentId($stuId: ID) {
    getShiftByStudentId(stuId: $stuId) {
      shiftName
      shiftId
    }
  }
`;
