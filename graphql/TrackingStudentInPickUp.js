import { gql } from "@apollo/client";

export const TRANKING_STUDENTINPICKUP = gql`
  query TrackingStudentInPickUp($studentId: String!) {
    trackingStudentInPickUp(studentId: $studentId)
  }
`;
