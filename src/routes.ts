import { Router } from 'express'
import authRouter from './auth/auth.route'
import categoryRouter from './category/category.route'

const router = Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)

export default router
