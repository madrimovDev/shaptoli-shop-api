import { Router } from 'express'
import authRouter from './auth/auth.route'
import categoryRouter from './category/category.route'
import productRoute from './product/product.route'
import cardRoute from './cart/cart.routes'

const router = Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/product', productRoute)
router.use('/cart', cardRoute)


export default router
