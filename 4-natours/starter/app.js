//API

const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json()); //middleware -> modify request respond

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


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)); //read data
//route handler - callback function - run inside event loop

const getAllTours = (req,res)=>{

    res.status(200).json({
        status:'success',
        results: tours.length, //sending array with multiple object
        data: {
         tours: tours //send back object that have tours propertie
        }
    })
}; //get data via api/v1/tours -> we should always specify version of api

const getOneTours = (req,res)=>{ //:id =define var !need to have colomn!

    console.log(req.params); //request parameter from link url
    //find element where id is equal to parameter
    const id = req.params.id * 1; //convert string to number from parameter
    
    if(id > tours.length || id < 0){
        return res.status(404).json({
            status : 'fail',
            message: 'Invalid ID'
        });
    }
    
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status:'success',
        data :{
            tour : tour
        }
    })
}; 

const postToursId = (req,res) =>{ //request,respond
    //we'll be using middleware first. 
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id : newId},req.body) //create new object,we assign only newId
    
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status: 'success',
            data : {
                tour: newTour
            }
        }); //created (200 = OKAY,201 = CREATED object)

    }); //dont use synchronous one !!!!!
    
    console.log(req.body);
    //res.send('Done');
} //url is exactly the same

const changeToursId = (req,res) =>{

    if( req.params.id*1 > tours.length || req.params.id < 0){
        return res.status(404).json({
            status : 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteToursId = (req,res) =>{

    if( req.params.id*1 > tours.length || req.params.id < 0){
        return res.status(404).json({
            status : 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({ //204 = delete
        status: 'success',
        data: {
            tour: '<delete finish...>'
        }
    })

}


//get all
app.get('/api/v1/tours', getAllTours);

//get one
app.get('/api/v1/tours/:id/', getOneTours);

//add tour data via id
app.post('/api/v1/tours',postToursId);

//update propertie on object
app.patch('/api/v1/tours/:id',changeToursId);

//delete
app.delete('/api/v1/tours/:id',deleteToursId);


const port = 3000;

app.listen(port,() =>{

    console.log(`App running on ${port}...`);
});

