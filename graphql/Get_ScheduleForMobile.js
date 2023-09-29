import { gql } from "@apollo/client";

export const Get_Schedule_For_Mobile = gql`
  query GetScheduleForMobile($classeId: String!, $day: AllowScheduleDay!) {
    getScheduleForMobile(classeId: $classeId, day: $day) {
      _id
      breakTime
      startTime
      endTime
      day {
        subjectId
        subjectName
        teacherId
        teacherName
        teacherProfileImg
      }
    }
  }
`;
