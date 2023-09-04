import { ControllerType } from '../common/types'
import cartService from './cart.service'

const addProductToCart: ControllerType = async (req, res, next) => {
  try {
    const { productId } = req.body
    const { id } = res.locals.user

    const cart = await cartService.addProductToCard(+productId, +id)

    res.send({
      message: 'Added Product to Cart',
      cartItem: cart,
    })
  } catch (e) {
    next(e)
  }
}

const removeProductFromCart: ControllerType = async (req, res, next) => {
  try {
    const { productId } = req.body
    const { id } = res.locals.user

    const removedProduct = await cartService.removeProductFromCart(
      +id,
      +productId
    )

    res.send({
      message: 'Removed Product from Cart',
      cartItem: removedProduct,
    })
  } catch (e) {
    next(e)
  }
}

const getUserCart: ControllerType = async (req, res, next) => {
  try {
    const userId = res.locals.user.id as number
    const carts = await cartService.getUserCart(userId)

    res.send({
      message: 'User cart',
      carts,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  addProductToCart,
  removeProductFromCart,
  getUserCart,
}
