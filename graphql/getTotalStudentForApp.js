import { gql } from "@apollo/client";

export const TOTAL_STUDENTS = gql`
query GetTotalStudentForApp {
    getTotalStudentForApp {
      total
      studentId
      gradeId
      classId
    }
  }
`