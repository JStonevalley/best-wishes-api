import { PrismaClient, User } from '@prisma/client'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { logger } from './log'
import { GraphQLError } from 'graphql'

const prisma = new PrismaClient()
initializeApp({
  credential: applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID,
})
export interface ApolloContext {
  prisma: PrismaClient
  user: User | null
  googleUserId: string | null
  origin: string
}
export const setupContext = async ({ req }: any) => {
  const idToken = req.headers.authorization
  if (!idToken) {
    return {
      prisma,
      user: null,
      googleUserId: null,
      origin: req.headers.origin,
    }
  }
  try {
    const googleUserId = (await getAuth().verifyIdToken(idToken)).uid
    const user = await prisma.user.findUnique({
      where: {
        googleUserId,
      },
    })
    return {
      prisma,
      user,
      googleUserId,
      origin: req.headers.origin,
    }
  } catch (error: any) {
    if (error?.errorInfo) {
      logger.error(error)
      throw new GraphQLError(error.errorInfo.message, {
        extensions: {
          firebaseCode: error.errorInfo.code,
          code: 'INVALID_ID_TOKEN',
          http: { status: 200 },
        },
      })
    }
    return {
      prisma,
      user: null,
      googleUserId: null,
      origin: req.headers.origin,
    }
  }
}
