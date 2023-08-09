import { Router } from 'express'
import upload from '../common/uploadFile.middleware'
import productController from './product.controller'
import { userVerify } from '../common/user-verify.middleware'

const router = Router()

router.post('/', upload.single('img'), productController.createProduct)
router.put('/:id', upload.single('img'), productController.updateProduct)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getProductById)
router.post(
  '/:id/image',
  userVerify(['admin']),
  upload.single('img'),
  productController.createImage
)
router.delete(
  '/image/:id',
  userVerify(['admin']),
  productController.deleteImage
)

export default router
