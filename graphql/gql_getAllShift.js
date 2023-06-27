import { gql } from "@apollo/client";


export const GET_ALLSHIFT = gql`
query GetAllShift {
  getAllShift {
    shiftName
    shiftId
  }
}
`;

