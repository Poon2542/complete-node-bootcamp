const fs = require('fs');

const Tour = require('./../models/tourModel');

//testing tours - json direcly -> uncomment here
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)); //read data ->JSON.parse will turn it into data object

//middleware checker - commenting out because we'll start implementing crud function
/*exports.checkID = (req,res,next,val) => {
    /*if(req.params.id > tours.length || req.params.id < 0){
        return res.status(404).json({ //we need to have this return else t will continue
            status : 'fail',
            message: 'Invalid ID'
        });
    }
    next();
}*/
exports.checkBody = (req,res,next) => {
    /*if(!req.body.name || !req.body.price){ //if there is no body name - body price
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }*/
    next();
}

exports.getAllTours =  async (req,res)=>{
    console.log(req.requestTime);

    const tours = await Tour.find() //MongoDB use find method to get all document

    try{
        res.status(200).json({
            status:'success',
            results: tours.length, //sending array with multiple object
            data: {
             requestedAt : req.requestTime,
             tours: tours //send back object that have tours propertie
            }
        });
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        });
    }


    /*res.status(200).json({
        status:'success',
        results: tours.length, //sending array with multiple object
        data: {
         requestedAt : req.requestTime,
         tours: tours //send back object that have tours propertie
        }
    })*/
}; //get data via api/v1/tours -> we should always specify version of api

exports.getOneTours = async (req,res)=>{ //:id =define var !need to have colomn!

    try{
        const tour = await Tour.findById(req.params.id); //from router
        res.status(200).json({
            status: 'success',
            data:{
                tour
            }
        });
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        });
    }


    //console.log(req.params); //request parameter from link url
    //find element where id is equal to parameter
    //const id = req.params.id * 1; //convert string to number from parameter
    
    //
    
    /*const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status:'success',
        data :{
            tour : tour
        }
    })*/
}; 

//this is a create function
exports.updateToursId = async (req,res) =>{ //request,respond
    
    //db
    //save result into newTour variable
    try{
        const newTour = await Tour.create(req.body); //create and pass data into there
    
        res.status(201).json({
            status: 'success',
            data : {
                tour: newTour
            }
        });
    } catch (error){
        res.status(400).json({
            status : 'fail',
            message : error
        });
    }

    //we'll be using middleware first. 

    /*const newId = tours[tours.length-1].id + 1;
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
    
    console.log(req.body);*/
    //res.send('Done');
} //url is exactly the same

exports.changeToursId = async(req,res) =>{

    //
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true, //return the document
            runValidators : true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour:tour
            }
        });

    }catch(error){
        res.status(400).json({
            status: 'fail',
            message : error
        });
    }

}

exports.deleteToursId = async (req,res) =>{

    //
    try{
        const tour = await Tour.findByIdAndDelete(req.params.Id);
        res.status(200).json({
            status : 'success',
            data : null
        });

    }catch(err){
        res.status(400).json({
            status : 'fail',
            message : err
        });
    }
}