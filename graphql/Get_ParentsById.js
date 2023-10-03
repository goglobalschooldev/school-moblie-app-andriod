import { gql } from "@apollo/client";

export const GER_PARENTSBYID = gql`
  query GetParentsById($id: ID) {
    getParentsById(_id: $id) {
      _id
      firstName
      lastName
      englishName
      nickName
      gender
      nationality
      profileImg
      village
      commune
      district
      province
      dob
      customerType
      permanentVillage
      permanentCommune
      permanentDistrict
      permanentProvince
      permanentCountry
      tel
      createdAt
    }
  }
`;
