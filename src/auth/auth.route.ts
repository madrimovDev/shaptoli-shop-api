import { NextFunction, Request, Response, Router } from 'express'
import authController from './auth.controller'
import bodyValidate from '../common/body-validate.middleware'
import registerScheme from './auth.model'
import createHttpError from 'http-errors'
import { errorHandler } from '../common/error-handler'

const router = Router()

router.post('/register', bodyValidate(registerScheme), authController.register)
router.post('/login', bodyValidate(registerScheme), authController.login)
router.get('/verify', authController.verify)
router.post('/verification', authController.verification)
router.post('/resend', authController.resend)
router.post('/forgot-password-email', authController.forgotPasswordEmail)
router.get('/forgot-password', authController.forgotPasswordLink)
router.use(errorHandler)

export default router
