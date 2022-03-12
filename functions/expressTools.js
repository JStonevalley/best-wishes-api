export const combineMiddleware =
  (...middlewares) =>
  (func) => {
    return [...middlewares, func].reduce((combination, middleware) => {
      return function (req, res, next) {
        combination(req, res, function (err) {
          if (err) {
            return next(err)
          }
          middleware(req, res, next)
        })
      }
    })
  }
