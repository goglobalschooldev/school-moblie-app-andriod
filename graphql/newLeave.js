import { gql } from "@apollo/client";

export const CREATE_LEAVE = gql`
  mutation CreateLeave($input: LeaveInput!) {
    createLeave(input: $input) {
      message
      status
    }
  }
`;

export const GET_LEAVE_PAGINATION = gql`
  query GetLeaveForMobile($parentId: ID!, $limit: Int) {
    getLeaveForMobile(parent_id: $parentId, limit: $limit) {
      _id
      classes {
        classes
        grade
      }
      createdAt
      englishName
      firstName
      lastName
      gender
      from
      to
      reason
      status
      profileImg
    }
  }
`;

export const GET_LEAVE_BYID = gql`
  query GetLeaveByID($id: ID!) {
    getLeaveByID(_id: $id) {
      _id
      classes {
        classes
        grade
      }
      createdAt
      englishName
      firstName
      lastName
      gender
      from
      to
      reason
      status
      profileImg
    }
  }
`;
