import crypto from 'crypto'
import { IResolvers } from "apollo-server-express"
import { Google } from '../../../lib/api'
import { Database, Viewer, User } from '../../../lib/types'
import { LoginArgs } from "./types"

async function loginViaGoogle(code: string, token: string, db: Database): Promise<User | undefined> {
  const {user} = await Google.login(code)
  if (!user) {
    throw new Error('Google login error')
  }
  // Name/Photo/Email lists
  const userNamesList = user.names && user.names.length ? user.names : null
  const userPhotosList = user.photos && user.photos.length ? user.photos : null
  const userEmailsList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null

  // user display name
  const userName = userNamesList ? userNamesList[0].displayName : null

  // user id
  const userId = userNamesList &&
  userNamesList[0].metadata &&
  userNamesList[0].metadata.source
    ? userNamesList[0].metadata.source.id
    : null

  // user avatar
  const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null

  // user email
  const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  }

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token
      }
    },
    { returnOriginal: false }
  )

  let viewer = updateRes.value

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      income: 0,
      bookings: [],
      listings: []
    });

    viewer = insertResult.ops[0];
  }

  return viewer
}

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`)
      }
    }
  },
  Mutation: {
    login: async (_root: undefined, { input }: LoginArgs, { db }: { db: Database }): Promise<Viewer> => {
      try {
        const code = input ? input.code : null
        const token = crypto.randomBytes(16).toString('hex')

        const viewer: User | undefined = code
         ? await loginViaGoogle(code, token, db)
         : undefined

         if (!viewer) {
           return { didRequest: true }
         }

         return {
           _id: viewer._id,
           token: viewer.token,
           avatar: viewer.avatar,
           walletId: viewer.walletId,
           didRequest: true
         }
      } catch (error) {
        throw new Error(`Failed to login: ${error}`)
      }
    },
    logout: (): Viewer => {
      try {
        return { didRequest: true }
      } catch (error) {
        throw new Error(`Failed to logout: ${error}`)
      }
    }
  },
  Viewer: {
    id: (viewer: Viewer): string | undefined => viewer._id,
    hasWallet: (viewer: Viewer): boolean | undefined => viewer.walletId ? true : undefined
  }
}
