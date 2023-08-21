import { ControllerType } from '../common/types'
import userService from './user.service'

const getAllUsers: ControllerType = async (req, res, next) => {
  try {
    const { verified } = req.query

    // verified = "false" | "true"
    // JSON.parse("false") -> false 

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

export default {
  getAllUsers,
}
