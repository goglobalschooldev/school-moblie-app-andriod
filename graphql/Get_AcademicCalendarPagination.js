import { gql } from "@apollo/client";

export const GER_ACADEMICCALENDAR = gql`
  query GetAcademicCalendarPagination(
    $limit: Int!
    $lg: String!
    $page: Int!
    $keyword: String
  ) {
    getAcademicCalendarPagination(
      limit: $limit
      lg: $lg
      page: $page
      keyword: $keyword
    ) {
      data {
        _id
        title
        from
        to
        lg
      }
    }
  }
`;
