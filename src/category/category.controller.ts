import { Request, Response } from 'express'
import categoryService from './category.service'

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const category = await categoryService.createCategory(name)

    res.status(201).send({
      message: 'Category Created',
      category,
    })
  } catch (e) {
    const error = e as Error
    res.status(403).send({
      message: error.message,
    })
  }
}

export default {
  createCategory,
}
