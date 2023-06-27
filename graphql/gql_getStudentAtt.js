import { gql } from "@apollo/client";

export const STUDENT_ATTENDANCE = gql`
query GetStudentAttendanceByStuId($stuId: ID, $startDate: Date, $endDate: Date, $limit: Int) {
  getStudentAttendanceByStuId(stuId: $stuId, startDate: $startDate, endDate: $endDate, limit: $limit) {
    _id
    sectionShiftId
    attendanceDate
    info {
      shiftId
      status
      morningCheckIn
      morningCheckOut
      afternoonCheckIn
      afternoonCheckOut
    }
  }
}
`;
