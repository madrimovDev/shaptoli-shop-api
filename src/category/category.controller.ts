import { NextFunction, Request, Response } from 'express'
import categoryService from './category.service'

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body
    const category = await categoryService.createCategory(name)

    res.status(201).send({
      message: 'Category Created',
      category,
    })
  } catch (e) {
    next(e)
  }
}

const getAllCategory = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategory()
    res.send({
      message: 'All CAtegories',
      categories,
    })
  } catch (e) {
    next(e)
  }
}

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const category = await categoryService.getCategoryById(+id)

    res.send({
      message: 'Category',
      category,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createCategory,
  getAllCategory,
  getCategoryById
}
