import { Order, OrderStatus } from '@prisma/client'
import prisma from '../prisma/prisma.service'
import createHttpError from 'http-errors'

interface CreateOrderParams {
  cartIds: number[]
}

const createOrder = async (params: CreateOrderParams) => {
  const carts = await prisma.cart.findMany({
    where: {
      id: {
        in: params.cartIds,
      },
    },
  })

  await prisma.cart.deleteMany({
    where: {
      id: {
        in: params.cartIds,
      },
    },
  })

  const order = await prisma.order.createMany({
    data: carts.map((cart) => {
      return {
        count: cart.count,
        productId: cart.productId,
        userId: cart.userId,
      }
    }),
  })


  return order
}

const getOrder = async (userId: number) => {
  const order = await prisma.order.findMany({
    where: {
      userId,
    },
  })
  return order
}

const changeStatusOrder = async (
  orderStatus: OrderStatus,
  orderIds: number[]
) => {
  const order = await prisma.order.findMany({
    where: {
      id: {
        in: orderIds,
      },
    },
  })

  if (!order.length) {
    throw createHttpError(404, 'Order not found')
  }

  const newOrder = await prisma.order.updateMany({
    where: {
      id: {
        in: orderIds,
      },
    },
    data: {
      status: orderStatus,
    },
  })

  return newOrder
}

export default {
  createOrder,
  getOrder,
  changeStatusOrder,
}
