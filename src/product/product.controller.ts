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
      cover: file.filename,
    })

    res.status(201).send({
      message: 'Product Created',
      product,
    })
  } catch (e) {
    next(e)
  }
}

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { name, price, categoryId, description } = req.body
    const file = req.file

    const product = await productService.updateProduct(+id, {
      name,
      price: +price || price,
      categoryId: +categoryId || categoryId,
      description,
      cover: file?.filename,
    })

    res.send({
      message: 'Product Updated',
      product,
    })
  } catch (e) {
    next(e)
  }
}

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const deletedProduct = await productService.deleteProduct(+id)
    res.send({
      message: 'Product Deleted',
      product: deletedProduct,
    })
  } catch (e) {
    next(e)
  }
}

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const product = await productService.getProductById(+id)
    res.send({
      message: 'Product Details',
      product,
    })
  } catch (e) {
    next(e)
  }
}

const createImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const file = req.file
    console.log(id)
    if (!file) throw createHttpError(404, 'File not found')

    const image = await productService.createImage(+id, file.filename)

    res.status(201).send({
      message: 'Image created',
      image,
    })
  } catch (e) {
    next(e)
  }
}

const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const image = await productService.deleteImage(+id)

    res.send({
      message: 'Image deleted',
      image,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  deleteImage,
  createImage,
}
