import { gql } from "@apollo/client";

export const ENROLLMENT_STUDENTS = gql`
  query GetEnrollmentByStudents($studentId: ID) {
    getEnrollmentByStudents(studentId: $studentId) {
      firstName
      lastName
      englishName
      programName
      gradeName
      shiftName
      className
      academicYearName
      status
      enrollmentId
      programId
      gradeId
      classId
      academicYearId
      shiftId
      studentId
      classGroupId
      classGroupNameEn
      classGroupName
    }
  }
`;
