import { gql } from "@apollo/client";

export const UPDATE_EYS = gql`
  mutation Mutation($updateEYSReport: EYSReportInputUpdate!) {
    updateEYSReport(updateEYSReport: $updateEYSReport) {
      success
      message
    }
  }
`;
