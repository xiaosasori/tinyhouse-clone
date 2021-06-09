// eslint-disable-next-line
process.env.NODE_ENV === 'development' && require('dotenv').config()

import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { connectDatabase } from './database'
import { typeDefs, resolvers } from './graphql'
import cors from 'cors'
import compression from 'compression'

const mount = async (app: Application) => {
  const db = await connectDatabase()

  // limit 2mb to allow upload image base64
  app.use(express.json({ limit: '2mb' }))
  app.use(cookieParser(process.env.SECRET))
  app.use(cors({ origin: process.env.PUBLIC_URL, credentials: true }))
  // app.use(compression())

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  })
  server.applyMiddleware({ app, path: '/api', cors: false })

  // app.use(express.static(`${__dirname}/client`))
  // app.get('/*', (_req, res) => res.sendFile(`${__dirname}/client/index.html`))


  app.listen(process.env.PORT)
}

mount(express())
