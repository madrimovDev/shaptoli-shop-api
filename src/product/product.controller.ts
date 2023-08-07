import { NextFunction, Request, Response } from 'express'
import productService from './product.service'
import createHttpError from 'http-errors'

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, categoryId } = req.body
    const file = req.file

    if (!file) {
      throw createHttpError(400, 'File not found')
    }

    const product = await productService.createProduct({
      name,
      price: +price,
      description,
      categoryId: +categoryId,
      cover: file.path,
    })

    res.status(201).send({
      message: 'Product Created',
      product,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createProduct,
}
