import { gql } from '@apollo/client'

export const USER = gql`
  query User($id: ID!, $bookingsPage: Int!, $listingsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasWallet
      income
      bookings(limit: $limit, page: $bookingsPage) {
        total
        result {
          listing {
            id
            title
            image
            address
            price
            numOfGuests
          }
          checkIn
          checkOut
        }
      }
      listings(limit: $limit, page: $listingsPage) {
        total
        result {
          id
          title
          image
          address
          price
          numOfGuests
        }
      }
    }
  }
`;

export interface User_user_bookings_result_listing {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface User_user_bookings_result {
  __typename: "Booking";
  listing: User_user_bookings_result_listing;
  checkIn: string;
  checkOut: string;
}

export interface User_user_bookings {
  __typename: "Bookings";
  total: number;
  result: User_user_bookings_result[];
}

export interface User_user_listings_result {
  __typename: "Listing";
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface User_user_listings {
  __typename: "Listings";
  total: number;
  result: User_user_listings_result[];
}

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  contact: string;
  hasWallet: boolean;
  income: number | null;
  bookings: User_user_bookings | null;
  listings: User_user_listings;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
  bookingsPage: number;
  listingsPage: number;
  limit: number;
}
