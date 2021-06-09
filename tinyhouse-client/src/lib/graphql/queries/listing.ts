import { gql } from "@apollo/client/core";
import { ListingType } from "../globalTypes";

export const LISTING = gql`
  query Listing($id: ID!, $bookingsPage: Int!, $limit: Int!) {
    listing(id: $id) {
      id
      title
      description
      image
      host {
        id
        name
        avatar
        hasWallet
      }
      type
      address
      city
      bookings(page: $bookingsPage, limit: $limit) {
        total
        result {
          id
          tenant {
            id
            name
            avatar
          }
          checkIn
          checkOut
        }
      }
      bookingsIndex
      price
      numOfGuests
    }
  }
`;

export interface Listing_listing_host {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  hasWallet: boolean;
}

export interface Listing_listing_bookings_result_tenant {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
}

export interface Listing_listing_bookings_result {
  __typename: "Booking";
  id: string;
  tenant: Listing_listing_bookings_result_tenant;
  checkIn: string;
  checkOut: string;
}

export interface Listing_listing_bookings {
  __typename: "Bookings";
  total: number;
  result: Listing_listing_bookings_result[];
}

export interface Listing_listing {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
  image: string;
  host: Listing_listing_host;
  type: ListingType;
  address: string;
  city: string;
  bookings: Listing_listing_bookings | null;
  bookingsIndex: string;
  price: number;
  numOfGuests: number;
}

export interface Listing {
  listing: Listing_listing;
}

export interface ListingVariables {
  id: string;
  bookingsPage: number;
  limit: number;
}

