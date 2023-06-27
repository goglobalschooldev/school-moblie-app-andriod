import { gql } from "@apollo/client";

export const UPDATE_IMAGE = gql`
  mutation UpdateMobileUserProfileImg(
    $mobileUserId: ID
    $profileImage: String
  ) {
    updateMobileUserProfileImg(
      mobileUserId: $mobileUserId
      profileImage: $profileImage
    ) {
      success
      message
    }
  }
`;
