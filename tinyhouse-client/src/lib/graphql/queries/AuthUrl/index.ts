import { gql } from '@apollo/client/core'

export const AUTH_URL = gql`
  query AuthUrl {
    authUrl
  }
`;
