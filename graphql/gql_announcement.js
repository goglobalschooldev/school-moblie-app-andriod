import { gql } from "@apollo/client/core";

export const QUERY_ANNOUNCEMENT = gql`
  query GetAnnouncement {
    getAnnouncement {
      _id
      title
      description
      picture
      date
    }
  }
`;
