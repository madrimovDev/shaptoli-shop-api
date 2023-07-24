import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import authService from './auth.service'

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const { password: pass, ...rest } = await authService.register(
      email,
      password
    )

    const accessToken = jwt.sign(rest, process.env.JWT_SECRET ?? 'SECRET')

    res.send({
      message: 'Register successful',
      user: rest,
      accessToken,
    })
  } catch (e) {
    const error = e as Error
    res.status(401).send({
      message: error.message,
    })
  }
}

export default {
  register,
}
