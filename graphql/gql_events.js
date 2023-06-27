import { gql } from "@apollo/client";

export const QUERY_EVENTS = gql`
  query GetEvents($academicYearId: ID) {
    getEvents(academicYearId: $academicYearId) {
      _id
      eventName
      eventNameKhmer
      eventDate
      endEventDate
      academicYearId {
        _id
        academicYear
      }
    }
  }
`;
