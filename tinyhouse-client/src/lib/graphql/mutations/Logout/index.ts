import { gql } from "@apollo/client/core";

export const LOGOUT = gql`
  mutation Logout {
    logout {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
