import { ControllerType } from '../common/types'
import userService from './user.service'

const getAllUsers: ControllerType = async (req, res, next) => {
  try {
    const { verified } = req.query

    const verifiedBool = verified ? JSON.parse(String(verified)) : undefined

    const users = await userService.getAllUser(verifiedBool)

    res.send({
      message: 'All Users',
      users,
    })
  } catch (e) {
    next(e)
  }
}

const getAllAdmins: ControllerType = async (req, res, next) => {
  try {
    const admins = await userService.getAllAdmins()
    res.send({
      message: 'All Admins',
      admins,
    })
  } catch (e) {
    next(e)
  }
}

const toggleAdmin: ControllerType = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await userService.toggleAdmin(+id)
    res.send({
      message: 'Toggle User',
      user,
    })
  } catch (e) {
    next(e)
  }
}

const deleteUsers: ControllerType = async (req, res, next) => {
  try {
    const count = await userService.deleteUsers()
    res.send({
      message: 'Deleted Users',
      count,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  getAllUsers,
  getAllAdmins,
  toggleAdmin,
  deleteUsers,
}
