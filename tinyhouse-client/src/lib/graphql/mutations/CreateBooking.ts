import { gql } from "@apollo/client/core"

export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      id
    }
  }
`

import { CreateBookingInput } from '../globalTypes'

export interface CreateBooking_createBooking {
  __typename: "Booking"
  id: string
}

export interface CreateBooking {
  createBooking: CreateBooking_createBooking
}

export interface CreateBookingVariables {
  input: CreateBookingInput
}
