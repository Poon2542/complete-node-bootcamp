const fs = require('fs');

const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeature');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

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

//middleware for tour
exports.aliasTopTours = (req,res,next) => {

    req.query.limit = '5'; //set propertie limit to 5
    req.query.sort = '-ratingAverage,price'; //sort by descending using rating average then price
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'; //define field we want to get

    next();
};

//WHAT - JAVA CLASS GO BACK AND READ THEM


exports.checkBody = (req,res,next) => {
    /*if(!req.body.name || !req.body.price){ //if there is no body name - body price
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }*/
    next();
}

exports.getAllTours =  catchAsync (async (req,res,next)=>{

    //Query
    //console.log(req.query);

    //filtering
    /*const queryObj = {...req.query}; //create structure from req.query object
    const excludedFields = ['page','sort','limit','fields'] //delete all page sort limit fields
    excludedFields.forEach(el=> delete queryObj[el]) //delete all field in queryobject

    //1) advance filtering - gte,gt,lte,lt - WTF ?????
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`) //regular expression - we need to clean it out
    //console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));*/
    
    //2)sorting
    /*if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        console.log(sortBy)
        query = query.sort(sortBy);
        //sort by second criteria
        //sort('price rating average')
    }else{
        query = query.sort('-createdAt');
    }*/
    
    //3) Field Limiting
    /*if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields)
        //query = query.select('name duration price') //select only these field name
    }else{
        query = query.select('-__v'); //excluding __v field from select
    }*/
    
    //4) Pagination (paging limit)
    /*const page = req.query.page * 1 || 1; //turn string into int, || = default 1
    const limit = req.query.limit * 1 || 100; //100 page limit
    const skip = (page-1)*limit;
    query = query.skip(skip).limit(limit); //limit = amount of result that we have in query
    //skip = get result skip 2 then select

    if(req.query.page){
        const numTours = await Tour.countDocuments();
        if(skip >= numTours) throw new Error('This page does not exist');
    }*/


    //EXECUTE QUERY - Keep adding stuff in the query until the end
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;

    /*const tours = await Tour.find({
        duration: 5,
        difficulty: 'easy'
    });*/ //MongoDB use find method to get all document

    /*const tours = await Tour.find()
        .where('duration')
        .equals(5)
        .where('difficulty')
        .equals('easy')*/

   
    res.status(200).json({
        status:'success',
        results: tours.length, //sending array with multiple object
        data: {
            requestedAt : req.requestTime,
            tours: tours //send back object that have tours propertie
        }
    });


    /*res.status(200).json({
        status:'success',
        results: tours.length, //sending array with multiple object
        data: {
         requestedAt : req.requestTime,
         tours: tours //send back object that have tours propertie
        }
    })*/
}); //get data via api/v1/tours -> we should always specify version of api

exports.getOneTours = catchAsync(async (req,res,next)=>{ //:id =define var !need to have colomn!

    const tour = await Tour.findById(req.params.id); //from router
    
    if(!tour){ //if there is no tour
        return next(new AppError('No tour found with that id',404)) //need to return "always"
    }
    
    res.status(200).json({
        status: 'success',
        data:{
            tour
        }
    });
    


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
}); 

//warp catchAsync function inside it
/*const catchAsync = fn => {
    return (req,res,next) => {
        fn(req,res,next).catch(err => next(err))
    }
}*/

//this is a create function
exports.updateToursId = catchAsync(async (req,res,next) =>{ //request,respond, fn = for error handlign async function
    
    //db
    //save result into newTour variable
    const newTour = await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data : {
            tour: newTour
        }
    });

    /*try{
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
    }*/

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
}); //url is exactly the same

exports.changeToursId = catchAsync(async(req,res,next) =>{

    //
    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
        new:true, //return the document
        runValidators : true //for checking validator such as name length etc. see tourModel
    });

    res.status(200).json({
        status: 'success',
        data: {
            tour:tour
        }
    });
});
        

    

exports.deleteToursId = catchAsync(async (req,res,next) =>{

    //
    const tour = await Tour.findByIdAndDelete(req.params.Id);
    res.status(200).json({
        status : 'success',
        data : null
    });
});

exports.getTourStats = catchAsync( async (req,res) => {
    const stats = await Tour.aggregate([
        {
            $match : {ratingsAverage : { $gte: 4.5}}
        },
        {
            $group : { //allow to group document together using accumulator
                _id : '$difficulty', //groupby difficulty
                numTours : {$sum : 1}, //for each doc we go to,add 1
                numRating : { $sum : '$ratingsQuantity'},
                avgRating: {$avg : '$ratingsAverage'},
                avgPrice: { $avg : '$price'},
                minPrice: { $min : '$price'},
                maxPrice: { $max : '$price'}
            }
        },
        {
            $sort : { avgPrice : 1}
        }
    ]); //use to manipulate data

    res.status(200).json({
        status: 'success',
        data: {
            stats : stats
        }
    });
});

exports.getMonthlyPlan = catchAsync (async (req,res,next) => {

    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match : {
                startDates : {
                    //we want our date to be greater - equal to ths
                    $gte : new Date(`${year}-01-01`), //greater thab work perfectly fine
                    $lte : new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group : {
                _id : { $month : `$startDates`},
                numTourStarts : {$sum : 1},
                tours : {$push : '$name'} //create array using push
            },
        },
        {
            $addFields : {month : '$_id'}
        },
        {
            $project : {
                _id : 0

            }
        },
        {
            $sort : {numTourStarts: -1} //1 = ascending ,-1 = descending
        },
        {
            $limit : 6
        }
    ]);
    

    res.status(200).json({
        status: 'success',
        data: {
            plan : plan
        }
    });
});