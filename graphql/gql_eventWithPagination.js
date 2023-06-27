import { gql } from "@apollo/client";

export const EVENT_PAGINATION = gql`
  query GetEventsWithPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $academicYearId: ID
  ) {
    getEventsWithPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      academicYearId: $academicYearId
    ) {
      events {
        _id
        eventName
        eventNameKhmer
        eventDate
        endEventDate
        academicYearId {
          _id
          academicYear
          status
        }
      }
      paginator {
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
        totalDocs
      }
    }
  }
`;
