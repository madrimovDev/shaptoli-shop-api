import { Router } from 'express'
import authController from './auth.controller'
import bodyValidate from '../common/body-validate.middleware'
import registerScheme from './auth.model'

const router = Router()

router.post('/register', bodyValidate(registerScheme), authController.register)

export default router
