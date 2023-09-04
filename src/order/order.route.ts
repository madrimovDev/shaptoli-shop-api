import { Router } from 'express'
import { userVerify } from '../common/user-verify.middleware'
import orderController from './order.controller'

const router = Router()

router.post('/', userVerify(['user']), orderController.createOrder)
router.get('/', userVerify(['user', 'admin']), orderController.getOrder)
router.put('/', userVerify(['admin']), orderController.changeStatusOrder)

export default router
