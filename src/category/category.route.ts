import { Router } from 'express'
import categoryController from './category.controller'
import { userVerify } from '../common/user-verify.middleware'
import { errorHandler } from '../common/error-handler'
import bodyValidate from '../common/body-validate.middleware'
import categoryModel from './category.model'

// category/1/product
// category/1

const router = Router()

router.post(
  '/',
  userVerify(['admin']),
  bodyValidate(categoryModel.createCategoryScheme),
  categoryController.createCategory
)
router.get(
  '/',
  userVerify(['user', 'admin']),
  categoryController.getAllCategory
)
router.get('/:id', userVerify(['admin']), categoryController.getCategoryById)

router.use(errorHandler)

export default router
