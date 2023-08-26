import { gql } from "@apollo/client";

export const GET_CLASSES_BY_STU = gql`
  query GetClassesByStudentForMobile($studentId: ID!, $academicYearId: ID!) {
    getClassesByStudentForMobile(
      student_id: $studentId
      academicYearId: $academicYearId
    ) {
      _id
      className
      totalStudent
    }
  }
`;
