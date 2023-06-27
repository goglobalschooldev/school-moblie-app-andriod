import { gql } from "@apollo/client";

export const MOBILE_USER = gql`
  query Query($mobileUserId: ID) {
    getMobileUserById(mobileUserId: $mobileUserId) {
      _id
      email
      password
      profileImage
    }
  }
`;
