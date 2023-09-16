import { gql } from "@apollo/client";

export const CHECK_ISSTUDENTINPICKUP = gql`
  query CheckIsStudentInPickUp($studentId: String!) {
    checkIsStudentInPickUp(studentId: $studentId)
  }
`;
