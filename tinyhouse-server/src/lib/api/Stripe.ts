import stripe from 'stripe'

const client = new stripe(`${process.env.S_SECRET_KEY}`, {
  apiVersion: "2020-08-27"
})

export const Stripe = {
  connect: async (code: string): Promise<stripe.OAuthToken> => {
    const response = await client.oauth.token({
      grant_type: "authorization_code",
      code
    })

    if (!response) {
      throw new Error("failed to connect to stripe")
    }

    return response
  },
  async disconnect(stripeUserId: string): Promise<stripe.OAuthDeauthorization> {
    const response = await client.oauth.deauthorize({
      client_id: process.env.S_CLIENT_ID!,
      stripe_user_id: stripeUserId
    })

    return response
  }
}
