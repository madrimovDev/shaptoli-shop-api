import { ControllerType } from './types'

const logger: ControllerType = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.table(
      [
        {
          method: req.method,
          url: req.url,
          body: req.body,
          params: req.params
        },
      ],
      ['method', 'url', 'body']
    )
  }
  next()
}
export default logger
