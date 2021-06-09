import { gql } from '@apollo/client/core'

export const DISCONNECT_STRIPE = gql`
mutation DisconnectStripe {
  disconnectStripe {
    hasWallet
  }
}
`

export interface DisconnectStripe_disconnectStripe {
  __typename: "Viewer"
  hasWallet: boolean | null
}

export interface DisconnectStripe {
  disconnectStripe: DisconnectStripe_disconnectStripe
}
