import {MongoClient} from 'mongodb'

const user = 'xiaosasori'
const password = 'yurnero1'
const cluster = 'cluster0.svqcx'
const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

  const db = client.db('main')
  return {
    listings: db.collection('listings')
  }
}
