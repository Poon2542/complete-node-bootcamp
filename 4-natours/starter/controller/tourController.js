const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)); //read data

//middleware checker
exports.checkID = (req,res,next,val) => {
    if(req.params.id > tours.length || req.params.id < 0){
        return res.status(404).json({ //we need to have this return else t will continue
            status : 'fail',
            message: 'Invalid ID'
        });
    }
    next();
}
exports.checkBody = (req,res,next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next();
}

exports.getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        results: tours.length, //sending array with multiple object
        data: {
         requestedAt : req.requestTime,
         tours: tours //send back object that have tours propertie
        }
    })
}; //get data via api/v1/tours -> we should always specify version of api

exports.getOneTours = (req,res)=>{ //:id =define var !need to have colomn!

    console.log(req.params); //request parameter from link url
    //find element where id is equal to parameter
    const id = req.params.id * 1; //convert string to number from parameter
    
    //
    
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status:'success',
        data :{
            tour : tour
        }
    })
}; 

exports.updateToursId = (req,res) =>{ //request,respond
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

exports.changeToursId = (req,res) =>{

    //

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteToursId = (req,res) =>{

    //

    res.status(204).json({ //204 = delete
        status: 'success',
        data: {
            tour: '<delete finish...>'
        }
    })
}