import { gql } from "@apollo/client";

export const DELETE_NOTIFICATION = gql`
  mutation DeleteNotificationByMobileUserId($mobileUserId: ID) {
    deleteNotificationByMobileUserId(mobileUserId: $mobileUserId) {
      success
      message
    }
  }
`;
