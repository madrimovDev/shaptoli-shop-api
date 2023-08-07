import createHttpError from 'http-errors'
import prisma from '../prisma/prisma.service'

const createCategory = async (name: string) => {
  const findedCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  })

  if (findedCategory) {
    throw createHttpError(400, 'Category name already exists')
  }

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  })

  return newCategory
}

const getAllCategory = async () => {
  const categories = await prisma.category.findMany()
  return categories
}

const getCategoryById = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          Product: true,
        },
      },
    },
  })

  if (!category) {
    throw createHttpError(404, 'Category not found')
  }

  const _category = {
    id: category.id,
    name: category.name,
    productCount: category._count.Product,
  }

  return _category
}

export default {
  createCategory,
  getAllCategory,
  getCategoryById,
}
