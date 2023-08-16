import { Router } from 'express'
import upload from '../common/uploadFile.middleware'
import productController from '../product/product.controller'
import { userVerify } from '../common/user-verify.middleware'
import bodyValidate from '../common/body-validate.middleware'

const router = Router()
  .post('/card', userVerify(['user', 'admin']), productController.createCart)
  .get('/', userVerify(['user', 'admin']), productController.getAllCart)
  .delete('/:id',userVerify(['user', 'admin']), productController.removedCart )

export default router
