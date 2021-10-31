// async.js
const asyncWrapper = (fn) => {
  //with express, automatically get req, res, next
  return async (req, res, next) => {
    try{
      await fn(req, res, next)
    } catch(error){
      //passing to next middleware
      //iff you pass error to next() and you do not handle it ina custom error handler, it will be handled by the built-in error handler
      next(error)
      //custom eror handlers have 4 arguments
    }
  }
}

module.exports = asyncWrapper;
