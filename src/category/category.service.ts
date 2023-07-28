import prisma from '../prisma/prisma.service'

const createCategory = async (name: string) => {
  const findedCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  })

  if (findedCategory) {
    throw new Error('Category name already exists')
  }

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  })

  return newCategory
}

export default {
  createCategory,
}
