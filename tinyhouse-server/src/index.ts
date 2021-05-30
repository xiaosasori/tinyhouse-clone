import express, {Application} from 'express'
import {ApolloServer} from 'apollo-server-express'
import {connectDatabase} from './database'
import {typeDefs, resolvers} from './graphql'

const app = express()
const port = process.env.PORT || 8080


const mount = async (app: Application) => {
  const db = await connectDatabase()
  const server = new ApolloServer({typeDefs, resolvers, context: () => ({db})})
  server.applyMiddleware({app, path: '/api'})

  app.listen(port)
}

mount(express())