import { gql } from "@apollo/client";

export const GER_USERINFO = gql`
  query GetMobileUserLogin {
    getMobileUserLogin {
      _id
      firstName
      lastName
      englishName
      profileImg
    }
  }
`;
