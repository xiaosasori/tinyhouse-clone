import { IResolvers } from 'apollo-server-express'
import { ObjectID } from 'mongodb';

import { Listing, Database, User, ListingType } from "../../../lib/types";

export const ListingResolvers: IResolvers = {
  Query: {
    listing: async (_root: undefined, _args: Record<string, unknown>, { db }: { db: Database })
    : Promise<Listing[]> => {
      return await db.listings.find({}).toArray()
    }
  },
  Mutation: {
    // deleteListing: async (_root: undefined, {id}: {id: string}, {db}: {db: Database})
    // : Promise<Listing> => {
    //   const deleteRes = await db.listings.findOneAndDelete({
    //     _id: new ObjectID(id)
    //   })

    //   if (!deleteRes.value) {
    //     throw new Error('Failed to delete listing')
    //   }
    //   return deleteRes.value
    // }
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString()
  }
}