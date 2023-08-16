import createHttpError from 'http-errors'
import prisma from '../prisma/prisma.service'
import { unlink } from 'fs'
import { join } from 'path'

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

const deleteProduct = async (id: number) => {
  const findedProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!findedProduct) {
    throw createHttpError(404, 'Product Not found')
  }

  unlink(join(__dirname, '../../uploads', findedProduct.cover), (err) => {
    if (err) {
      console.log('File not deleted', err)
    } else {
      console.log('File successful deleted')
    }
  })

  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  })

  return deletedProduct
}

const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      description: true,
      name: true,
      cover: true,
      Image: true,
      price: true,
      Rating: true,
      Detail: true,
      Review: true,
    },
  })

  if (!product) {
    throw createHttpError(404, 'Product not found')
  }
  return product
}

const createImage = async (id: number, img: string) => {
  const image = await prisma.image.create({
    data: {
      img,
      productId: id,
    },
  })

  return image
}

const deleteImage = async (id: number) => {
  const image = await prisma.image.delete({
    where: {
      id,
    },
  })

  unlink(join(__dirname, '../../uploads', image.img), (err) => {
    if (err) {
      console.log('File not deleted', err)
    } else {
      console.log('File successful deleted')
    }
  })

  return image
}

const createDetail = async (productId: number, key: string, value: string) => {
  const detail = await prisma.detail.create({
    data: {
      productId,
      key,
      value,
    },
  })
  return detail
}

const updateDetail = async (id: number, key?: string, value?: string) => {
  const findedDetail = await prisma.detail.findUnique({
    where: {
      id,
    },
  })

  if (!findedDetail) {
    throw createHttpError(404, 'Detail not found')
  }

  const detail = await prisma.detail.update({
    where: {
      id,
    },
    data: {
      key,
      value,
    },
  })
  return detail
}

const deleteDetail = async (id: number) => {
  const findedDetail = await prisma.detail.findUnique({
    where: {
      id,
    },
  })

  if (!findedDetail) throw createHttpError(404, 'Detail not found')

  const detail = await prisma.detail.delete({ where: { id } })
  return detail
}

const createReview = async (
  comment: string,
  userId: number,
  productId: number
) => {
  const review = await prisma.review.create({
    data: {
      comment,
      userId,
      productId,
    },
  })
  return review
}

const createCart = async (userId: number, productId: number, count: number) => {
  const card = await prisma.cart.create({
    data: {
      userId,
      productId,
      count,
    },
  })
  return card
}

const allCart = async () => {
  const card = await prisma.cart.findMany({
    select: {
      id: true,
      count: true,
      userId: true,
      productId: true,
    },
  })
  return card
}

const findCartById = async (id: number) => {
  const cart = await prisma.cart.findUnique({
    where: { id },
  })
  return cart
}

const removeCart = async (id: number) => {
  const card = await prisma.cart.delete({
    where: { id },
  })
  return card
}

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  deleteImage,
  createImage,
  createDetail,
  updateDetail,
  deleteDetail,
  createReview,
  createCart,
  allCart,
  removeCart,
  findCartById
}
