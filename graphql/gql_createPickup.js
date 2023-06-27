import { gql } from "@apollo/client";

export const CREATE_PICKUP = gql`
  mutation CreatePickingUp($newPickingUp: PickingUpInput) {
    createPickingUp(newPickingUp: $newPickingUp) {
      success
      message
    }
  }
`;
