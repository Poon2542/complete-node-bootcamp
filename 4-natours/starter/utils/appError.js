class AppError extends Error{ //inhereit from Error class
    constructor(message,statusCode){
        super(message); //set message propertie from parent class
        //set up statusCode and it's status. if it fail = error
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; //if it's operational then it's true

        Error.captureStackTrace(this,this.constructor) //when a new object is created it will not appear in stack trane
    }

}
module.exports = AppError;