import prisma from '../prisma/prisma.service'
import bcrypt from 'bcrypt'
import verifyService from './verify.service'
import { sendMail } from '../common/mailer.service'

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
    },
  })

  const verification = await verifyService.createVerification({
    email,
    userId: user.id,
  })

  sendMail(email, verification.code)

  return verification
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

const verification = async (verificationId: string, code: string) => {
  const verification = await verifyService.findVerification(verificationId)
  if (!verification) {
    throw new Error('Verification not found')
  }

  const codeIsValid = +code === verification.code

  if (codeIsValid) {
    const user = await prisma.user.update({
      where: {
        id: verification.userId,
      },
      data: {
        verified: true,
      },
    })
    return user
  } else {
    throw new Error('Code not valid')
  }
}

export default {
  register,
  login,
  verification,
}
