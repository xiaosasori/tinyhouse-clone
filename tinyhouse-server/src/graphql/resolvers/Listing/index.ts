import { IResolvers } from 'apollo-server-express'
import { Request } from 'express'
import { ObjectId } from 'mongodb';
import { ListingArgs, ListingBookingsArgs, ListingBookingsData, ListingsData, ListingsArgs, ListingsQuery, ListingsFilter } from './types'
import { authorize } from '../../../lib/utils'

import { Listing, Database, User, ListingType } from "../../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (_root: undefined, { id }: ListingArgs, { db, req }: { db: Database, req: Request })
      : Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) });
        if (!listing) {
          throw new Error("listing can't be found");
        }
        const viewer = await authorize(db, req);
        if (viewer && viewer?._id === listing.host) {
          listing.authorized = true;
        }

        return listing;
      } catch (error) {
        throw new Error(`Failed to query listing: ${error}`);
      }
    },
    listings: async (
      _root: undefined,
      { location, filter, limit, page }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const query: ListingsQuery = {};

        const data: ListingsData = {
          region: null,
          total: 0,
          result: []
        };

        // if (location) {
        //   const { country, admin, city } = await Google.geocode(location);

        //   if (city) query.city = city;
        //   if (admin) query.admin = admin;
        //   if (country) {
        //     query.country = country;
        //   } else {
        //     throw new Error("no country found");
        //   }
        //   const cityText = city ? `${city}, ` : "";
        //   const adminText = admin ? `${admin}, ` : "";
        //   data.region = `${cityText}${adminText}${country}`;
        // }

        const cursor = db.listings.find(query);

        if (filter === ListingsFilter.PRICE_LOW_TO_HIGH) {
          cursor.sort({
            price: 1
          });
        }

        if (filter === ListingsFilter.PRICE_HIGH_TO_LOW) {
          cursor.sort({
            price: -1
          });
        }

        cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query listings: ${error}`);
      }
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
    id: (listing: Listing): string => listing._id.toString(),
    host: async (
      { host }: Listing,
      _args: Record<string, unknown>,
      { db }: { db: Database }
    ): Promise<User> => {
      const user = await db.users.findOne({ _id: host });
      if (!user) {
        throw new Error("host can't be found");
      }
      return user;
    },
    bookingsIndex: ({ bookingsIndex }: Listing): string => {
      console.log('bookingsIndex', bookingsIndex)
      return JSON.stringify(bookingsIndex);
    },
    bookings: async (
      { authorized, bookings }: Listing,
      { limit, page }: ListingBookingsArgs,
      { db }: { db: Database }
    ): Promise<ListingBookingsData | null> => {
      try {
        if (!authorized) {
          return null;
        }

        const data: ListingBookingsData = {
          total: 0,
          result: []
        };

        const cursor = db.bookings.find({ _id: { $in: bookings } });
        cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`Failed to query listing's bookings: ${error}`);
      }
    }
  }
}
