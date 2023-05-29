
const sendErrorDev = (err,res) => {
    res.status(err.statusCode).json({
        status : err.status,
        error : err,
        message : err.message,
        stack: err.stack // what is stack
    });
}

const sendErrorProd = (err,res) =>{


    //operational, trusted error : send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        });
    
    //Programming or other unknwon error : don't leak error detail
    }else{
        //1) Log error
        console.error('Error !!!',err);

        //2) Send generic message
        res.status(500).json({
            status : 'error',
            message : 'Something is very wrong!!'
        });
    }
}


module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500 //defind err.statuscode else internal server errr
    err.status = err.status || 'error' //error status to html
    
    if(process.env.NODE_ENV == 'development'){
        sendErrorDev(err,res);
    }else if (process.env.NODE_ENV == 'production'){
        sendErrorProd(err,res);
    }

    
};