//API

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./router/tourRoute')
const usersRouter = require('./router/userRoute')

app.use(express.json()); //middleware -> modify request respond

//middleware
app.use(morgan('dev')); //very useful for tracking api

app.use((req,res,next) =>{ //third argument = middleware function (in this case = next)
    console.log('Hello from the middleware');
    next();
});

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


module.exports = app;