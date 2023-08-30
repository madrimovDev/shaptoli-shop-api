import { Router } from 'express'
import authRoute from './auth/auth.route'
import categoryRoute from './category/category.route'
import productRoute from './product/product.route'
import cardRoute from './cart/cart.route'
import { errorHandler } from './common/error-handler'
import userRoute from './user/user.route'
import logger from './common/logger.middleware'
import botUserRoute from './botUser/botUser.route'

const router = Router()

router.use(logger)
router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/category', categoryRoute)
router.use('/product', productRoute)
router.use('/cart', cardRoute)
router.use('/botUser', botUserRoute)
router.use(errorHandler)

export default router
