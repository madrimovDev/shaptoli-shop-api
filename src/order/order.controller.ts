import createHttpError from 'http-errors'
import bot from '../bot/bot.service'
import { ControllerType } from '../common/types'
import prisma from '../prisma/prisma.service'
import orderService from './order.service'
import { OrderStatus } from '@prisma/client'

const createOrder: ControllerType = async (req, res, next) => {
  try {
    const { cartIds } = req.body
    const id = res.locals.user.id as number
    await orderService.createOrder({ cartIds })
    const order = await orderService.getOrder(id)

    const botUsers = await prisma.botUser.findMany()

    botUsers.forEach((user) => {
      bot.sendMessage(user.telegramId, JSON.stringify(order))
    })

    res.send({
      message: 'Order created',
      order,
    })

  } catch (e) {
    next(e)
  }
}

const getOrder: ControllerType = async (req, res, next) => {
  try {
    const { userId } = req.body
    const order = await orderService.getOrder(userId)

    res.send({
      message: 'User order',
      order,
    })
  } catch (e) {
    next(e)
  }
}

const changeStatusOrder: ControllerType = async (req, res, next) => {
  try {
    const { orderIds } = req.body
    const { status } = req.query
    if (!status) {
      throw createHttpError(400, 'status not found')
    }
    const order = await orderService.changeStatusOrder(
      status as OrderStatus,
      orderIds
    )

    res.send({
      message: 'User order',
      order,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createOrder,
  getOrder,
  changeStatusOrder,
}
