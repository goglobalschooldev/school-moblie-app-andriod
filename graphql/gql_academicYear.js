import { gql } from "@apollo/client";

export const ACADEMIC_YEAR = gql`
  query GetActiveAcademicYear {
    getActiveAcademicYear {
      _id
      academicYearName
      academicYearKhName
    }
  }
`;
