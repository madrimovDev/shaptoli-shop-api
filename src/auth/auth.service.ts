import prisma from '../prisma/prisma.service'
import bcrypt from 'bcrypt'

const register = async (email: string, password: string) => {
  const findedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (findedUser) {
    throw new Error('Email has already exists')
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      verified: true,
    },
  })
  return user
}

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw new Error('User not found!')
  }

  const compare = await bcrypt.compare(password, user.password)

  if (!compare) {
    throw new Error('Passwrod wrong')
  }

  return user
}

export default {
  register,
  login,
}
