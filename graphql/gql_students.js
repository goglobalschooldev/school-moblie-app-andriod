import { gql } from "@apollo/client";

export const QUERY_STUDENTS = gql`
  query GetStudentCardByStudentID($parentId: ID) {
    getStudentsByParents(parentId: $parentId) {
      _id
      firstName
      lastName
      englishName
      profileImg
      student_id
      enrollments {
        _id
        programId {
          _id
          programmName
        }
        academicYearId {
          _id
          academicYear
        }
        gradeId {
          _id
          gradeName
        }
        startDate
        endDate
        classId {
          _id
          className
        }
        shiftId {
          _id
          shiftName
        }
      }
    }
  }
`;
