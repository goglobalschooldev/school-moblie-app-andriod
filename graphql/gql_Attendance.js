import { gql } from "@apollo/client";

export const STU_ATTENDANCE = gql`
query GetAttendanceByStudentIdForMobile($studentId: ID!, $sectionShiftId: ID) {
  getAttendanceByStudentIdForMobile(studentId: $studentId, sectionShiftId: $sectionShiftId) {
    attendanceId
    attendanceDate
    studentId
    studentName
    status
    remark
    sectionShiftId
    academicYearId
  }
}
`;
