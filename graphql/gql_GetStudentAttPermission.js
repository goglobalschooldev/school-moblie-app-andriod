import { gql } from "@apollo/client";

export const STUDENT_ATT_PERMISSION = gql`
query GetStudenAttendancePermissionById($stuId: ID, $limit: Int) {
    getStudenAttendancePermissionById(stuId: $stuId, limit: $limit) {
      startDate
      requestDate
      reason
      endDate
      shiftId {
        shiftName
      }
    }
  }
`