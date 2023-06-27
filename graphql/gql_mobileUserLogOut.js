import { gql } from "@apollo/client";

export const MOBILE_USER_LOGOUT = gql`
  mutation MobileUserLogOut($mobileUserId: ID, $token: String) {
    mobileUserLogOut(mobileUserId: $mobileUserId, token: $token) {
      success
      message
    }
  }
`;
