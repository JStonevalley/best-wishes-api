import { PrismaClient } from '@prisma/client'
import { User } from 'nexus-prisma'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { logger } from './log'
const prisma = new PrismaClient()
initializeApp({
  credential: applicationDefault(),
  projectId: 'bestwishes-ab288',
})
export interface Context {
  prisma: PrismaClient
  user?: User
}
export const setupContext = async ({ req }: any) => {
  const idToken = req.headers.authorization
  logger.info(`Id token ${idToken ? 'provided' : 'not provided'}`)
  if (!idToken) {
    return {
      prisma,
    }
  }
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken)
    const user = await prisma.user.findUnique({
      where: {
        googleUserId: decodedToken.uid,
      },
    })
    logger.info(user)
    return {
      prisma,
      user,
    }
  } catch (error) {
    logger.error(error)
    return {
      prisma,
    }
  }
}
