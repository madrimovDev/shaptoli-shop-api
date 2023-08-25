import { Order } from '@prisma/client'
import prisma from '../prisma/prisma.service'
import { ControllerType } from '../common/types'

// interface CreateOrderParams {
//   userId: number
//   product: {
//     id: number
//     count: number
//   }[]
// }

// const createOrder = async (params: CreateOrderParams) => {
//   const { count } = await prisma.cart.deleteMany({
//     where: {
//       userId: params.userId,
//       AND: {
//         productId: {
//           in: params.product.map((prod) => prod.id),
//         },
//       },
//     },
//   })

//   const arr: { userId: number; productId: number; count: number }[] = []

//   params.product.forEach((prod) => {
//     arr.push({
//       userId: params.userId,
//       productId: prod.id,
//       count: prod.count,
//     })
//   })

//   const order = await prisma.order.createMany({
//     data: arr,
//   })
// }

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
}

const createOrderController: ControllerType = async (req, res, next) => {
  const { cardIds } = req.body
  const cardIdsArray = cardIds as number[]
  const order = await createOrder({ cartIds: cardIdsArray })
}
