import { gql } from "@apollo/client";

export const UPDATE_MOBILE_TOKEN = gql`
  mutation Mutation($mobileUserId: ID, $newToken: TokenInput) {
    updateMobileToken(mobileUserId: $mobileUserId, newToken: $newToken) {
      success
      message
    }
  }
`;
