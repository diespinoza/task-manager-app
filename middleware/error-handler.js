//error handler

const {CustomAPIError} = require('../errors/custom-errors')

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err)
  if(err instanceof CustomAPIError){
    return res.status(err.statusCode).json({msg:err.message})
  }
  return res.status(500).json({msg:"Something went wrong, please try again :p"})
  // return res.status(err.status).json({msg:err.message})
  // return res.status(500).json({msg:err})
  //can change what msg: is equal to. can hardcode it
}

//want to create a custom error class that extends
//from the javacript error class. that way we can handle
//all the 404
//
module.exports = errorHandlerMiddleware;
