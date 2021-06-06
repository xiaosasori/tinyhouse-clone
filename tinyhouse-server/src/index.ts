// eslint-disable-next-line
require('dotenv').config()

import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { connectDatabase } from './database'
import { typeDefs, resolvers } from './graphql'
import cors from 'cors'

const mount = async (app: Application) => {
  const db = await connectDatabase()

  app.use(cookieParser(process.env.SECRET))
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  })

  server.applyMiddleware({ app, path: '/api', cors: false })

  app.listen(process.env.PORT)
}

mount(express())
