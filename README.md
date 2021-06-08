## Features
- Sign-in with their Google account
- Search for listing in different locations in the world
- See specific details about listings
- Book listings for a period of time
- Connect their Stripe account to be allowed to create listings and receive payments from other users
- Create listings of their own
- See a history of the listings they've created, the bookings they've made, and the bookings made to their own listings
- See a history of listings created by other users

## Authentication with google
- Go to [console](https://console.cloud.google.com/apis/credentials)
- Click `credentials` on sidebar. Create credentials, select OAuth Client ID.
- When choosing `scope`, select email, profile, openid
- After finishing first steps above, click to `credentials`, select create OAuth Client ID again. Choose `web application`, set authorized JS origins to `http://localhost:...`
- Enable Google People Api in console to let server get those info

## Geocoding API
### Setup
- Enable Geocoding API in console
- Go to `credentials` tab and create a new API key.
- Select `Restrict key` in `API restrictions` section. Choose `Geocoding API` in dropdown. Now `save`

### [doc](https://developers.google.com/maps/documentation/geocoding/overview?hl=en#ReverseGeocoding)

## Index DB
- Go to atlas and create index in collection `listings`
```json
{
  "country": 1,
  "admin": 1,
  "city": 1
}
```

## [Stripe](https://dashboard.stripe.com/)
- Connect accounts with option `Platform or marketplace`
- Add redirect URL to client (e.g: http://localhost:3000)
- Enable OAuth for Standard accounts. Check `view test data`
- [oAuth](https://stripe.com/docs/connect/oauth-reference#post-token)
- [Chark](https://stripe.com/docs/connect/direct-charges)

## [Cloudinary](https://cloudinary.com/documentation/image_upload_api_reference#examples)