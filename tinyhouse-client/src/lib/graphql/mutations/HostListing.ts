import { gql } from '@apollo/client'
import { HostListingInput } from '../globalTypes'

export const HOST_LISTING = gql`
mutation HostListing($input: HostListingInput!) {
  hostListing(input: $input) {
    id
  }
}
`;

export interface HostListing_hostListing {
  __typename: "Listing";
  id: string;
}

export interface HostListing {
  hostListing: HostListing_hostListing;
}

export interface HostListingVariables {
  input: HostListingInput;
}
