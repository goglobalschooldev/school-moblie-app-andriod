import { gql } from "@apollo/client";

export const REMOVE_MOBILE_USER_TOKEN = gql`
  mutation RemoveMobilUserToken($osType: String, $user: String!) {
    removeMobilUserToken(osType: $osType, user: $user) {
      message
      status
    }
  }
`;
