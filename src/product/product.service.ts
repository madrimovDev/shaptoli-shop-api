import createHttpError from 'http-errors'
import prisma from '../prisma/prisma.service'

type CreateProductType = {
  name: string
  price: number
  description: string
  cover: string
  categoryId: number
}

type UpdateProductType = {
  [key in keyof CreateProductType]?: CreateProductType[key]
}

const createProduct = async (data: CreateProductType) => {
  const product = await prisma.product.create({
    data: {
      ...data,
    },
  })
  return product
}

const updateProduct = async (id: number, data: UpdateProductType) => {
  const findedProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!findedProduct) {
    throw createHttpError(404, 'Product not found')
  }

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  })

  return product
}

export default {
  createProduct,
  updateProduct,
}
