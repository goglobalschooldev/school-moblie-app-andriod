import { gql } from "@apollo/client";

export const ADD_MOBILE_USER_TOKEN = gql`
  mutation AddMobilUserToken($user: String!, $token: String, $osType: String) {
    addMobilUserToken(user: $user, token: $token, osType: $osType) {
      message
      status
    }
  }
`;
