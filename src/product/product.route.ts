import { Router } from 'express'
import upload from '../common/uploadFile.middleware'
import productController from './product.controller'

const router = Router()

router.post('/', upload.single('img'), productController.createProduct)

export default router
