import { MongoClient } from 'mongodb'
import { Database, Listing, User, Booking } from '../lib/types'

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// const url = `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0-shard-00-00.${process.env.DB_CLUSTER}.mongodb.net:27017,cluster0-shard-00-01.${process.env.DB_CLUSTER}.mongodb.net:27017,cluster0-shard-00-02.${process.env.DB_CLUSTER}.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-13xdq4-shard-0&authSource=admin&retryWrites=true&w=majority`
export const connectDatabase = async (): Promise<Database> => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    const db = client.db('main')

    return {
      listings: db.collection<Listing>('listings'),
      bookings: db.collection<Booking>('bookings'),
      users: db.collection<User>("users")
    }
  }
  catch (error) {
    throw new Error(`Unable to connect to the database ${error}`)
  }
}
