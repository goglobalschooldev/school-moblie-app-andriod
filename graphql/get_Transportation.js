import { gql } from "@apollo/client";

export const GET_TRANSPORTATION = gql`
  query GetTransportation {
    getTransportation {
      _id
      parentId {
        _id
      }
    }
  }
`;
