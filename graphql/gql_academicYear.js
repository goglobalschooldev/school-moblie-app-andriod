import { gql } from "@apollo/client";

export const ACADEMIC_YEAR = gql`
  query GetActiveAcademicYear {
    getActiveAcademicYear {
      _id
      academicYear
      status
      startDate
      endDate
    }
  }
`;

export const ALL_ACADEMIC_YEAR = gql`
  query GetAcademicYear {
    getAcademicYear {
      _id
      academicYear
      academicYearInKhmer
      status
    }
  }
`;
