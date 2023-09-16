import { gql } from "@apollo/client";

export const CHECL_IS_CLASS_FOR_EYS = gql`
  query CheckIsClassEYSMobile($classesId: String!) {
    checkIsClassEYSMobile(classesId: $classesId)
  }
`;
