import { ConnectStripeInput } from "../globalTypes"
import { gql } from '@apollo/client/core'

export const CONNECT_STRIPE = gql`
  mutation ConnectStripe($input: ConnectStripeInput!) {
    connectStripe(input: $input) {
      hasWallet
    }
  }
`

export interface ConnectStripe_connectStripe {
  __typename: "Viewer"
  hasWallet: boolean | null
}

export interface ConnectStripe {
  connectStripe: ConnectStripe_connectStripe
}

export interface ConnectStripeVariables {
  input: ConnectStripeInput
}
