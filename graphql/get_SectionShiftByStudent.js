import { gql } from "@apollo/client";

export const SECTION_SHIFT_BY_STUDENT = gql`
  query GetSectionShiftByStudent($studentId: String!) {
    getSectionShiftByStudent(studentId: $studentId) {
      _id
      academicYearId
      classGroupCode
      classGroupNameEn
      classId
      englishName
      firstName
      lastName
      programId
      programme
      sectionShiftName
      studentId
      totalStudent
    }
  }
`;
