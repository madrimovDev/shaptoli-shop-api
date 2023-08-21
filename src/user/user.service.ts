import createHttpError from 'http-errors'
import prisma from '../prisma/prisma.service'

const getAllUser = async (verified?: boolean) => {
  const users = await prisma.user.findMany({
    where: {
      verified,
    },
  })
  return users
}

const getAllAdmins = async () => {
  const admins = await prisma.user.findMany({
    where: {
      role: 'admin',
    },
  })
  return admins
}

const toggleAdmin = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw createHttpError(404, 'User not found')
  }

  const toggleUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: user.role === 'user' ? 'admin' : 'user',
    },
  })

  return toggleUser
}

const deleteUsers = async () => {
  const { count } = await prisma.user.deleteMany({
    where: {
      verified: false,
    },
  })

  return count
}

export default {
  getAllUser,
  getAllAdmins,
  toggleAdmin,
  deleteUsers,
}
