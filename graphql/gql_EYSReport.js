import { gql } from "@apollo/client";

export const EYS_REPORT = gql`
query GetEYSReportPagination($stuId: String, $date: String) {
  getEYSReportPagination(stuId: $stuId, date: $date) {
    data {
      _id
      date
      stuId {
        _id
      }
      food {
        iconsrc
        iconname
        title
        qty
        description
      }
      activities {
        iconsrc
        iconname
        title
        qty
        description
      }
      atSchool {
        title
        description
      }
      parentsCheck {
        title
        description
      }
      parentsRequest
      nurseComment
      parentsComment
    }
  }
}
`;
