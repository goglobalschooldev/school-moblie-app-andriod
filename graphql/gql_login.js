import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        profileImage
        parentId {
          _id
          firstName
          lastName
          englishName
          tel
          village
          commune
          district
          province
          profileImg
          occupation
          currentAddress
          gender
        }
      }
    }
  }
`;
