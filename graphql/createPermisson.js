import { gql } from "@apollo/client";

export const CREATE_PERMISSION = gql`
  mutation CreatePermission($newData: PermissionInput) {
    createPermission(newData: $newData) {
      startDate
      reason
      endDate
      requestDate
      shiftName
      success
      message
    }
  }
`;
