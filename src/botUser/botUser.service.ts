import createHttpError from 'http-errors'
import prisma from '../prisma/prisma.service'

const createBotUser = async (userId: number, telegramId: number) => {
  const findedUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!findedUser) {
    throw createHttpError(404, 'User not found')
  }

  const findedBotUser = await prisma.botUser.findUnique({
    where: {
      userId,
    },
  })

  if (findedBotUser) {
    throw createHttpError(400, 'Bot User already exists')
  }

  const botUser = await prisma.botUser.create({
    data: {
      userId,
      telegramId,
    },
  })

  return botUser
}

export default {
  createBotUser,
}
