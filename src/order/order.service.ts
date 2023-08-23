import { Order } from '@prisma/client'
import prisma from '../prisma/prisma.service'

interface CreateOrderParams {
  userId: number
  product: {
    id: number
    count: number
  }[]
}

const createOrder = async (params: CreateOrderParams) => {
  const { count } = await prisma.cart.deleteMany({
    where: {
      userId: params.userId,
      AND: {
        productId: {
          in: params.product.map((prod) => prod.id),
        },
      },
    },
  })

  const arr: { userId: number; productId: number; count: number }[] = []

  params.product.forEach((prod) => {
    arr.push({
      userId: params.userId,
      productId: prod.id,
      count: prod.count,
    })
  })

  const order = await prisma.order.createMany({
    data: arr,
  })
}
