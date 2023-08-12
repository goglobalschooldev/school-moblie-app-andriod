import { gql } from "@apollo/client";

export const GET_NOTIFICATION = gql`
  query GetNotifications($userId: ID!, $limit: Int!) {
    getNotifications(user_id: $userId, limit: $limit) {
      _id
      notifBy {
        image
        name
        id
      }
      type
      forUser
      navigetId
      action
      viewers
      createdAt
      description
      view
    }
  }
`;

export const VIEW_NOTIFICATION = gql`
  mutation ViewNotification($notificationId: String!, $parentId: String!) {
    viewNotification(notification_id: $notificationId, parent_id: $parentId) {
      message
      status
    }
  }
`;
