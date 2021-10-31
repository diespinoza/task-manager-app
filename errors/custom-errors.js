// custom-errors

class CustomAPIError extends Error{
  //called once when a new instance is created
  constructor(message, statusCode){
    //invokes constructor of the parent class
    super(message);
    //create status code
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg,statusCode);
}

//check the class because want to check if that instance is equal to the customError one

module.exports = {createCustomError, CustomAPIError};

