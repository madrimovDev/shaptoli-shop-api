import { Router } from 'express'
import { userVerify } from '../common/user-verify.middleware'
import userController from './user.controller'

const router = Router()

router.get('/', userVerify(['supervisor']), userController.getAllUsers)
router.get('/admins', userVerify(['supervisor']), userController.getAllAdmins)
router.put(
  '/admins/:id',
  userVerify(['supervisor']),
  userController.toggleAdmin
)
router.delete('/admins', userVerify(['supervisor']), userController.deleteUsers)

export default router
