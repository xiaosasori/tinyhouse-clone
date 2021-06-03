import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8080/api'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  headers: {
    'X-CSRF-TOKEN': sessionStorage.getItem("token") || ''
  },
})

export default apolloClient
