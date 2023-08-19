import { Router } from 'express'
import { userVerify } from '../common/user-verify.middleware'
import cartController from './cart.controller'

const router = Router()

router.post('/', userVerify(['user']), cartController.addProductToCart)
router.delete('/', userVerify(['user']), cartController.removeProductFromCart)

export default router
