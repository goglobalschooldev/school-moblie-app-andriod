import { gql } from "@apollo/client";

export const GET_ANNOUCEMENTBYID = gql`
  query GetAnnouncementById($id: ID) {
    getAnnouncementById(_id: $id) {
      _id
      title
      description
      picture
      date
    }
  }
`;
