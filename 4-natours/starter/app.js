//API

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')
const tourRouter = require('./router/tourRoute')
const usersRouter = require('./router/userRoute')

app.use(express.json()); //middleware -> modify request respond

//console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    //middleware
    app.use(morgan('dev')); //very useful for tracking api
}

app.use(express.static(`${__dirname}/public`));

/*app.use((req,res,next) =>{ //third argument = middleware function (in this case = next)
    console.log('Hello from the middleware');
    next();
});*/

//when exactly request happen ?? -> use middleware !!
app.use((req,res,next) =>{ //third argument = middleware function (in this case = next)
    req.requestTime = new Date().toISOString(); //convert to string
    next();
});


/*
//node app are all about request - response
app.get('/',(req,res) =>{ //access - request -response object

    //200 = ok
    res.status(404).json({message:"Hello from the server side" //set to json
    , app : "Natours"});

}); //route is basically route url

app.post('/',(req,res) =>{ //send default specify any code (this is not get method)

    res.send('You can post to the endpoint');
})*/

/*
//get all
app.get('/api/v1/tours', getAllTours);

//get one
app.get('/api/v1/tours/:id/', getOneTours);

//add tour data via id
app.post('/api/v1/tours',updateToursId);

//update propertie on object
app.patch('/api/v1/tours/:id',changeToursId);

//delete
app.delete('/api/v1/tours/:id',deleteToursId);*/

//route
//const tourRouter = express.Router();
//const usersRouter = express.Router();

//middle ware stack - MOUNT ROUTER
app.use('/api/v1/tours',tourRouter); //middleware function -when it match will run tourRouter
app.use('/api/v1/users',usersRouter);

//Error handling undefine route
//it need to be in the last of the stack (behind use middleware)
app.all('*',(req,res,next)=>{ // * = everything that come here and all = every verb url
    /*res.status(404).json({
        status : 'fail',
        message : `Can't find ${req.originalUrl} on this server!`
    })*/

    /*const err = new Error( `Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;*/
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404)); //if we pass something into next it will skip all other middleware inthe stack to err middleware
});

//middleware for sending err
app.use(globalErrorHandler);


module.exports = app;