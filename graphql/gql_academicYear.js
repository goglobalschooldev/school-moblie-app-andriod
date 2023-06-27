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
