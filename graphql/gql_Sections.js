import { gql } from "@apollo/client";

export const STU_SECTION = gql`
  query GetSectionShiftByClassId(
    $classId: ID
    $academicYearId: ID
    $programId: ID
  ) {
    getSectionShiftByClassId(
      classId: $classId
      academicYearId: $academicYearId
      programId: $programId
    ) {
      _id
      sectionShiftName
      academicYearId {
        _id
        academicYear
      }
      programId {
        _id
        programmName
      }
      classId {
        _id
        className
      }
      sections {
        _id
        subjectId {
          _id
          subjectName
        }
        leadTeacherId {
          _id
          firstName
          lastName
          englishName
          profileImg
        }
        duration
        startTime
        endTime
        breakTime
        dayOfWeek
        teacherAssistantId {
          _id
          firstName
          lastName
        }
        classroomId {
          _id
          classroomName
        }
      }
    }
  }
`;
